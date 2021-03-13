import * as fs from 'fs';
import * as path from 'path';

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

    static match_wildcard(filename: string, pattern: string): boolean {
        function match_wildcard(filename: string, fpos: number, pattern: string, ppos: number): boolean {
            if (filename.length === fpos && pattern.length === ppos) {
                return true;
            }

            if (filename.length === fpos || pattern.length === ppos) {
                return false;
            }

            if (filename[fpos] == pattern[ppos]) {
                return match_wildcard(filename, 1 + fpos, pattern, 1 + ppos);
            }
            if (pattern[ppos] === '*') {
                return match_wildcard(filename, 1 + fpos, pattern, ppos) || match_wildcard(filename, fpos, pattern, 1 + ppos);
            }

            return false;
        }

        return match_wildcard(filename, 0, pattern, 0);
    }

    static change_extension(filename: string, newext: string): string {
        if (newext && newext.length > 0) {
            return path.basename(filename) + "." + newext;
        } else {
            return path.basename(filename);
        }
    }
}