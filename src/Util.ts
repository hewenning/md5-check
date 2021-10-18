import * as fs from "fs";
import * as path from "path";
import { EncodingType } from "./Enum";
import { MD5 } from "./MD5";

export class FileUtil {

    /**
     * @param filePath 绝对路径
     * @returns 
     */
    public static isPathExist(filePath: string): boolean {
        return fs.existsSync(filePath)
    }

    /**
     * @param filePath 绝对路径
     * @returns 
     */
    public static getMD5ByFilePathSync(filePath: string): string {
        let md5 = MD5.getInstance().getMD5ByFileBuffer(fs.readFileSync(filePath));
        return md5;
    }


    /**
     * @param relativePath 相对路径
     * @param encodeType 编码类型
     * @returns 
     */
    public static appendFileContentByPath(relativePath: string, data: string) {
        fs.appendFileSync(path.resolve(relativePath), data)
    }

    /**
     * @param relativePath 相对路径
     * @param data 写入数据
     * @param encodeType 编码类型
     * @returns 
     */
    public static writeFileContentByPath(relativePath: string, data: string, encodeType:EncodingType = EncodingType.UTF8): void {
        if (!StringUtil.isValidString(relativePath)) {
            LoggerUtil.warning("writeFileContentByPath relativePath is invalid");
            return;
        }
        fs.writeFileSync(path.resolve(relativePath), data);
    }

    /**
     * @param relativePath 相对路径
     * @param encodeType 编码类型
     * @returns 
     */
    public static readFileContentByPath(relativePath: string, encodeType:EncodingType = EncodingType.UTF8): string {
        if (!StringUtil.isValidString(relativePath)) {
            LoggerUtil.warning("relativePath is invalid");
            return "";
        }
        let content = fs.readFileSync(FileUtil.convertToAbsolutePath(relativePath), encodeType);
        return content;
    }

    /**
     * @param relativePath 相对路径
     * @returns 
     */
    public static convertToAbsolutePath(relativePath: string): string {
        if (!StringUtil.isValidString(relativePath)) {
            LoggerUtil.warning("convertToAbsolutePath relativePath is invalid");
            return "";
        }
        return path.resolve(relativePath);
    }

    /**
     * @param dirPath 搜索文件夹路径
     * @param resultMap 结果Map
     * @returns 
     */
    public static fileSearchSync(dirPath: string, resultArr: string[], isRecursive: boolean = true, callback?: Function) {
        if (!StringUtil.isValidString(dirPath)) {
            LoggerUtil.warning("fileSearch dirPath is invalid");
            return resultArr;
        }
        const files = FileUtil.fsReadDirSync(dirPath);
        for (let i = 0; i < files.length; i += 1)
        {
            files[i] = path.join(dirPath, files[i]);
        }
        files.forEach(filePath => {
            let stat = fs.statSync(filePath)
            if (stat.isDirectory()) {
                if (isRecursive) {
                    return FileUtil.fileSearchSync(filePath, resultArr, isRecursive, callback);
                }
            } else{
                resultArr.push(filePath);
                if (callback) {callback(filePath)}
            }
        });
        return resultArr;
    };
    
    /**
     * name
     */
    public static fsReadDirSync(dir: string): string[] {
        return fs.readdirSync(dir);
    }

    public static async fsReadDir(dir: string): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            fs.readdir(dir, (err, files) => {
                if (err) {
                    LoggerUtil.error(err);
                    reject(err);
                }
                resolve(files);
            });
        });
    }

    public static async fsStat(path: string): Promise<fs.Stats> {
        return new Promise<fs.Stats>((resolve, reject) => {
            fs.stat(path, (err, stat) => {
                if (err) {
                    LoggerUtil.error(err);
                    reject(err);
                }
                resolve(stat);
            });
        });
    }

}

export class StringUtil {
    static isValidString(str: string): boolean {
        return str != null && str != undefined && str.length != 0;
    }

    /**
     * @param map 序列化
     * @returns 
     */
    public static serializalDataByMap(result: Map<any, any>): string {
        let serializedData: string = "";
        result.forEach((value, key) => {
            serializedData = serializedData + "MD5: " + key + "\n";
            if (value.forEach) {
                value.forEach((element: any) =>{
                    serializedData = serializedData + element + "\n";
                }) 
            } else {
                serializedData = serializedData + value + "\n";
            }
        });
        return serializedData;
    }

    /**
     * @param object 序列化对象
     * @returns 
     */
    public static serializalDataByObject(obj: object, level: number = 0): string {
        let result = "";
        let levelPadding = "";
        for(let index = 0; index < level + 1; index++) {
            levelPadding += "    ";
        }
        if(typeof(obj) == 'object') {  
            Object.keys(obj).forEach(item => {
                let value = obj[item as keyof object];
                if(typeof(value) == 'object') { 
                    result += levelPadding + "'" + item + "' ...\n";
                    result += StringUtil.serializalDataByObject(value, level + 1);
                } else {
                    result += levelPadding + "'" + item + "' => \"" + value + "\"\n";
                }
            });
        } else { 
            result = "===>" + obj + "<===(" + typeof(obj) + ")";
        }
        return result;
    }
}

export class TimeUtil {
    static getNowTime(): string {
        return new Date().toString();
    }
}

export class LoggerUtil {
    static log(content: any): void {
        console.log(TimeUtil.getNowTime() + "\n" + "Log:" + "\n" + content.toString());
    }
    static warning(content: any): void {
        console.warn(TimeUtil.getNowTime() + "\n" + "Warning:" + "\n" + content.toString());
    }
    static error(content: any): void {
        console.error(TimeUtil.getNowTime() + "\n" +"Error: " + "\n" + content.toString());
    }
}

export class FunctionUtil {
    static delayTimeCallback (time: number, callback: Function = () => {}): void {
        setTimeout(callback, time);
    }

    static Handler(callback: Function, ...param: any): Function {
        return () => {callback(...param);};
    }
}