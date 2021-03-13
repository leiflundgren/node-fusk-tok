import * as fs from 'fs';
import * as path from 'path';
import { FsWrapper } from './fs-wrapper';


export class GenerateWebPages {

    files: string[];
    target_folder: string;
    display_name: string;

    constructor(target_folder: string, display_name: string, args: string[]) {

        this.target_folder = target_folder;
        this.display_name = display_name;

        this.files = fs.readdirSync(this.target_folder)
            .filter(fn => {
                const ext = path.extname(fn);
                return args.includes(ext);
            })
            .sort()
            ;

        console.log(`Will generate web for ${this.files.length} files`);
    }


    escapeHtml(s: string): string {
        return s.
            replace(/&/g, "&amp;").
            replace(/</g, "&lt;").
            replace(/>/g, "&gt;").
            replace(/\"/g, "&quot;");
    }

    hrefifyPath(s: string) : string {
        if (s[1] === ':')
            return 'file:///' + s.replace('\\', '/');
        else
            return s;
    }

    change_html_ext(s: string): string {
        var ext = path.extname(s);
        var base = path.basename(s);

        const html = base.substr(0, base.length - ext.length) + ".html";
        return html;
    }


    generate_page_html(prev: string, curr: string, next: string): string {
        console.log(`Generating image-page for ${curr}`);

        var html = '<html><head>';
        html += '<title>';
        html += this.escapeHtml(curr);
        html += '</title>';

        html += '<style>';
        html += 'html, body {\n';
        html += '    height: 100%;\n';
        html += '    margin: 0;\n';
        html += '    padding: 0;\n';
        html += '}\n';
        html += '\n';
        html += 'img {\n';
        html += '    padding: 0;\n';
        html += '    display: block;\n';
        html += '    margin: 0 auto;\n';
        html += '    width: 100%;\n';
        html += '}\n';
        html += '</style>\n';

        html += '</head>\n';
        html += '<body>';
        html += '<p>';
        var next_href=''
        if (prev) {
            prev = this.change_html_ext(path.basename(prev));
            html += `<a href="${prev}">Prev ${prev}</a>&nbsp;&nbsp;&nbsp;\n`;
        }
        if (next) {
            next_href = `href="${this.hrefifyPath(this.change_html_ext(next))}"`;
            html += `<a ${next_href}">next ${next}</a>&nbsp;&nbsp;&nbsp;\n`;
        }
        html += '</p>\n';

        html += `<p><a ${next_href} border="0"><img src=${this.hrefifyPath(curr)} /></a></p>`;
        html += "</body>\n";
        html += "</html>\n";
        return html;
    }

    generate_index_html(): string {

        console.log(`Generating index-page for ${this.files.length} files`);

        var html = '<html><head><title>';
        html += this.escapeHtml(this.display_name);
        html += "</title></head>\n";
        html += '<body>\n';
        html += this.files.map(f => `<p><a href="${this.hrefifyPath(path.basename(this.change_html_ext(f)))}">${f}</a></p>\n`).join('');
        html += "</body>\n";
        html += "</html>\n";
        return html;
    }

    async make_index_page() {
        const filename = path.join(this.target_folder, "index.html");
        const html = this.generate_index_html();


        await FsWrapper.writeFile(filename, html);

        console.log(`saved index-page for ${filename} `);

    }


    async make_image_page(n: number) {
        const curr_file = this.files[n];
        const prev_file = (n > 0 ? this.files[n - 1] : null);
        const next_file = ((n + 1) < this.files.length ? this.files[n + 1] : null);
        if (!next_file) {
            const bp = 17;
        }

        const filename = path.join(this.target_folder, this.change_html_ext(curr_file));

        const html = this.generate_page_html(prev_file, curr_file, next_file);
        await FsWrapper.writeFile(filename, html);
        console.log(`saved image-page for ${filename} `);
    }

    make_all_image_pages() {
        for (let n = 0; n < this.files.length; ++n) {
            this.make_image_page(n);
        }
    }

}