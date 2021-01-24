var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('fetch');
class PageHandler {
    constructor(page_id) {
        this.page_id = page_id;
        this.page_url = `https://twokinds.keenspot.com/comic/${this.page_id}/`;
    }
    retreive() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("No retreive yet");
            const rsp = fetch(this.page_url);
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
        });
    }
}
//# sourceMappingURL=page_handler.js.map