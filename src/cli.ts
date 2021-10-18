import { Core } from "./core/Core";
import { Test } from "./test/Test";
import { LoggerUtil, StringUtil } from "./Util";

const { program } = require('commander');
/**
 * NPM 的 Package 信息
 */
const PACKAGE_INFO = require("../package.json");

/**
 * 初始化CLI基本信息
 */
program
    .name(PACKAGE_INFO.name)
    .description(PACKAGE_INFO.description)
    .version(PACKAGE_INFO.version, "-v, --version", "output the current version")

/**
 * info
 */
program
    .command('info')
    .description("print toolkit info")
    .action(function() {
        let obj = {
            name: PACKAGE_INFO.name,
            info: PACKAGE_INFO.description,
            version: PACKAGE_INFO.version,
            author: PACKAGE_INFO.author.name
        };
        LoggerUtil.log(StringUtil.serializalDataByObject(obj));
    })


/**
 * run
 */
let run = program
    .command("run [checkpath] [savepath]")
    .description("input check path to check and save path to save results")
    .option("--recursive", "whether recursive", false)
    .action(function(checkPath: string = '', savePath: string = ''){
        if (!StringUtil.isValidString(checkPath)) {
            LoggerUtil.error("Please input valid check path or save path");
            return;
        }
        let isRecursive = run.opts().recursive;
        new Core().runByPath(checkPath, savePath, isRecursive);
    })


/**
 * test
 */
program
    .command("test")
    .action(function() {
        new Test().runTestByPath();
    })

program.parse(process.argv);

