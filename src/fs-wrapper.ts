import * as fs from 'fs';

export class FsWrapper {

    static async writeFile(fileName: string, data: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(fileName, data, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}