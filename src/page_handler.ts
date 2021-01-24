require('fetch')


class PageHandler {

    page_id: number;
    page_url: string;

    constructor(page_id: number) {
        this.page_id = page_id;
        this.page_url = `https://twokinds.keenspot.com/comic/${this.page_id}/`;
    }



    async retreive() {


        console.log("No retreive yet");

        const rsp = fetch(this.page_url)
        //console.log(rsp);


        //const req = new re

        //const client = new HttpClient("clientTest");
        //const response = await client.get();
        //const filePath = "C:\\temp\\downloadedFile.png";
        //const file: NodeJS.WritableStream = fs.createWriteStream(filePath);

        //if (response.message.statusCode !== 200) {
        //    const err: Error = new Error(`Unexpected HTTP response: ${response.message.statusCode}`);
        //    err["httpStatusCode"] = response.message.statusCode;
        //    throw err;
        //}
        //return new Promise((resolve, reject) => {
        //    file.on("error", (err) => reject(err));
        //    const stream = response.message.pipe(file);
        //    stream.on("close", () => {
        //        try { resolve(filePath); } catch (err) {
        //            reject(err);
        //        }
        //    });
        //});
    }

}