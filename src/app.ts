import { request } from "https";
import * as fs from 'fs';
import * as path from 'path';
import { PageHandler } from "./page_handler";
import { ImageDownloader } from "./image_downloader";
import { GenerateWebPages } from "./gen_webpage";
import { FsWrapper } from "./fs-wrapper";
import { start } from "repl";

console.log('Hello world');

const delay = ms => new Promise(res => setTimeout(res, ms));

function log_err(err) {
    console.log(`some error happened: ${err}`);
}

class DownloadTask {
    start_at: number;
    last_successful_number: number;
    last_successful_filename: string;
    target_folder: string;
    file_prefix: string;

    constructor(start_at: number, target_folder:string, file_prefix:string) {
        this.start_at = start_at;
        this.target_folder = target_folder;
        this.file_prefix = file_prefix;
        while (this.file_prefix[this.file_prefix.length - 1] == "_")
            this.file_prefix = this.file_prefix.substring(0, this.file_prefix.length - 1);
    }

    async download() {
        try {
            for (let i = this.start_at; ; ++i) {
                const ph = new PageHandler(i);
                await ph.retreive();

                var n_str = i.toString();
                while (n_str.length < 4)
                    n_str = "0" + n_str;

                const start = ph.image_url.lastIndexOf('/') + 1;
                const filename_without_path = ph.image_url.substr(start);

                const imgd = new ImageDownloader(ph.image_url, path.join(this.target_folder, `${this.file_prefix}_${n_str}_${filename_without_path}`));
                await imgd.download();

                this.last_successful_number = i;
                this.last_successful_filename = imgd.filename;
            }

            console.log("SUCCESS!");
        }
        catch (ex) {
            console.log("Failed: " + ex);
        }
    }
}

function make_webpages(target_path: string, display_name:string, patterns : string[]) {
    console.log(`Trying to generate webpages for [ ${patterns} }`);
    const generator = new GenerateWebPages(target_path, display_name, patterns);
    generator.make_index_page();
    generator.make_all_image_pages();
}

async function update_existing(target_path: string, target_file_prefix:string) {
    const existing_files = fs.readdirSync(target_path).filter(fn => fn.startsWith(target_file_prefix)).sort();
    const existing_images = existing_files.filter(fn => {
        const ext = path.extname(fn);
        return ext == ".jpg" || ext == ".png";
    });
    const existing_html = existing_files.filter(fn => fn != "index.html" && path.extname(fn) == ".html" );

    var start_fetch_at = 0;
    if (existing_files.length == 0) {

    } else {
        const last_image = existing_images[existing_images.length - 1];
        const last_n = last_image.substr(target_file_prefix.length).match(/^\d+/);
        start_fetch_at = parseInt(String(last_n));
    }

    console.log(`Starting download from number ${start_fetch_at}`);
    const download = new DownloadTask(start_fetch_at, target_path, target_file_prefix);
    await download.download();

    if (download.last_successful_number > 0) {

        if (existing_html.length > 0) {
            const last_html = existing_html[existing_html.length - 1];
             
            try {
                await fs.unlink(last_html, (err) => {
                    console.log(`Failed to delete ${last_html}: ${err}`);
                });
            } catch (err) {
                console.log(`Failed to delete ${last_html}: ${err}`);
            }
        }

        make_webpages(target_path, target_file_prefix, [".jpg", ".png"]);
    }

}

async function main() {

    console.log(process.argv);

    if (process.argv.length < 3 ) { // no extra args

        console.log(`Syntax: <target_folder> <target_file_prefix`);
    }
    else if (process.argv.length == 3) {
        await update_existing(process.argv[2], "");
    }
    else if (process.argv.length == 4) {
        await update_existing(process.argv[2], process.argv[3]);
    }
    else { // make web-pages
        make_webpages(process.argv[2], "", process.argv.slice(3));
    }

    console.log("delaying before existing");
    await delay(50000);

}

main();
