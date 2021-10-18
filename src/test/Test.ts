import { Core } from "../core/Core";
import { LoggerUtil, StringUtil } from "../Util";
export class Test {

    public runTestByFile() {
        new Core().runByFile('./Path.txt', './Write.txt', true);
    }

    public runTestByPath() {
        new Core().runByPath('D:/Test', '', true);
    }
    
    public runTestSerializalDataByObject() {
        const PACKAGE_INFO = require("../../package.json");
        let obj = {
            name: PACKAGE_INFO.name,
            info: PACKAGE_INFO.description,
            version: PACKAGE_INFO.version,
            author: PACKAGE_INFO.author.name
        };
        LoggerUtil.log(StringUtil.serializalDataByObject(obj));
    }
}