import { FileUtil, LoggerUtil, StringUtil } from "../Util";
export class Core {
    private run(checkPath: string, savePath: string, isRecursive = true) {
        let result: Map<string, string[]> = new Map();
        FileUtil.fileSearchSync(checkPath, [], isRecursive).forEach((filePath) => {
            let md5 = FileUtil.getMD5ByFilePathSync(filePath);
            let arr = result.get(md5) || [];
            arr.push(filePath);
            result.set(md5, arr);
        })
        FileUtil.writeFileContentByPath(savePath, StringUtil.serializalDataByMap(result));
    }

    /**
     * @param checkPath 检查绝对路径
     * @param writePath 写路径
     */
    public runByPath(checkPath: string, writePath: string, isRecursive = true) {
        if (!FileUtil.isPathExist(checkPath)) {
            LoggerUtil.error("[Class Core] " + " [Method runByPath] " + "Please input valid check path")
            return;
        }
        if (!FileUtil.isPathExist(writePath)) {
            writePath = FileUtil.convertToAbsolutePath("./Write.txt")
        }
        this.run(checkPath, writePath, isRecursive);
    }

    /**
     * @param readPath 读入路径
     * @param writePath 写路径
     */
    public runByFile(readPath: string, writePath: string, isRecursive = true) {
        this.run(FileUtil.readFileContentByPath(readPath), writePath, isRecursive);
    }
}