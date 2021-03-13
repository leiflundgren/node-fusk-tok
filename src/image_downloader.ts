import * as axios from 'axios';
//import fileDownload from 'js-file-download';
import * as fs from 'fs'


export class ImageDownloader {
    image_url: string;
    filename: string;

    constructor(image_url: string, target_path:string) {
        // https://cdn.twokinds.keenspot.com/comics/20050314.jpg
        this.image_url = image_url;
        this.filename = target_path
    }

    axios_err_handler(err) {
        if (err) {
            console.log(`Saving failed: ${err}`);
        } else {
            console.log(`Saving succeeded`);
        }
    }
    getFilename(url: string): string {
        if (!url) return "";

        const last_slash = url.lastIndexOf("/");
        if (last_slash < 0) return "";

        return url.substr(last_slash + 1);
    }

    getFilenameWithoutExt(s: string): string {
        const withext = this.getFilename(s);
        const dot = withext.lastIndexOf('.');
        return dot < 0 ? withext : withext.substr(0, dot);
    }

    isAlreadyDownloaded(): boolean {
        return fs.existsSync(this.filename);
    }

    async download() {

        if (this.isAlreadyDownloaded()) {
            console.log(`Already downloaded ${this.image_url} to ${this.filename}`);
            return;
        }

        var req_conf: axios.AxiosRequestConfig = {
            url: this.image_url,
            method: 'GET',
            responseType: 'arraybuffer',
        };

        console.log(`retreiving image ${this.image_url}`)
        const rsp = await axios.default.request(req_conf);
        //console.log(rsp);

        //axios.default.do

        //fileDownload(null, rsp.data, this.filename)

        var data = rsp.data;
        //var buf = Buffer.from()

        var file_config = {};
        fs.writeFile(this.filename, rsp.data, this.axios_err_handler);

        console.log(`saved ${this.filename}`);
    }
}
