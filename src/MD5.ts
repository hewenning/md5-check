import * as crypto from "crypto";
import { Singleton } from "./Singleton";

export class MD5 extends Singleton {
    private cache: Map<Buffer, string> = new Map();
    public getMD5ByFileBuffer(fileBuffer: Buffer): string {
        if (this.cache.get(fileBuffer)) {
            return this.cache.get(fileBuffer)!;
        }
        let md5Hash: any = crypto.createHash('md5');
        md5Hash.update(fileBuffer, 'utf8');
        const md5: string = md5Hash.digest('hex');
        this.cache.set(fileBuffer, md5);
        return md5;
    }
}