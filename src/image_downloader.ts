import * as axios from 'axios';
//import fileDownload from 'js-file-download';
import * as fs from 'fs'


export class ImageDownloader {
    image_url: string;
    filename: string;

    constructor(image_url: string, file_prefix: string) {
        // https://cdn.twokinds.keenspot.com/comics/20050314.jpg
        this.image_url = image_url;

        const start = image_url.lastIndexOf('/') + 1;
        this.filename = file_prefix + image_url.substr(start);
    }

    axios_err_handler(err) {
        if (err) {
            console.log(`Saving failed: ${err}`);
        } else {
            console.log(`Saving succeeded`);
        }
    }

    async download() {
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
