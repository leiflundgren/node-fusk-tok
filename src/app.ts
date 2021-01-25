import { request } from "https";
import { PageHandler } from "./page_handler";
import { ImageDownloader } from "./image_downloader";

console.log('Hello world');

const delay = ms => new Promise(res => setTimeout(res, ms));


async function main() {

    try {
        for (let i = 1; ; ++i) {
            const ph = new PageHandler(i);
            await ph.retreive();

            const imgd = new ImageDownloader(ph.image_url, "twokinds_");
            await imgd.download();
        }

        console.log("SUCCESS!");
    }
    catch (ex) {
        console.log("Failed: " + ex);
    }

    await delay(50000);
}

main();
