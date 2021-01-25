import * as axios from 'axios';


export class PageHandler {

    page_id: number;
    page_url: string;
    image_url: string;

    img_key: string = 'src="https://cdn.twokinds.keenspot.com/comics/';

    constructor(page_id: number) {
        this.page_id = page_id;
        this.page_url = `https://twokinds.keenspot.com/comic/${this.page_id}/`;
    }



    async retreive() {


        console.log(`retreive page ${this.page_url}`);
        try {
            const rsp = await axios.default.get(this.page_url)
            //console.log(rsp.data);

            // Expect something like:
            //'\t\t\t<img\n' +
            //'\t\t\t\tsrc="https://cdn.twokinds.keenspot.com/comics/20050314.jpg"\n' +
            //'\t\t\t\t\n' +
            //'\t\t\t\talt="Comic Page"\n' +

            var html: string;
            html = rsp.data;


            var idx = html.indexOf(this.img_key);
            console.log(`key ${this.img_key} is at ${idx}`);

            var img_url_start = html.indexOf('"', idx) + 1;
            var img_url_end = html.indexOf('"', img_url_start);

            this.image_url = html.substring(img_url_start, img_url_end);
            console.log(`image url: ${this.image_url}`);
        }
        catch (ex) {
            console.log("Failed to retreive: " + ex);
            throw ex;
        }
    }

}