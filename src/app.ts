import { request } from "https";
import { PageHandler } from "./page_handler";
import { ImageDownloader } from "./image_downloader";
import { GenerateWebPages } from "./gen_webpage";

console.log('Hello world');

const delay = ms => new Promise(res => setTimeout(res, ms));


async function download() {
    try {
        for (let i = 514; ; ++i) {
            const ph = new PageHandler(i);
            await ph.retreive();

            const imgd = new ImageDownloader(ph.image_url, "S:\\temp\\twokinds\\twokinds_");
            await imgd.download();
        }

        console.log("SUCCESS!");
    }
    catch (ex) {
        console.log("Failed: " + ex);
    }
}

function make_webpages(target_path: string, patterns : string[]) {
    console.log(`Trying to generate webpages for [ ${patterns} }`);
    const generator = new GenerateWebPages(target_path, patterns);
    generator.make_index_page();
    generator.make_all_image_pages();
}

async function main() {

    console.log(process.argv);

    if (process.argv.length == 2) { // no extra args

        await download();
    }
    else { // make web-pages
        make_webpages(process.argv[2], process.argv.slice(3));
    }

    await delay(50000);

}

main();
