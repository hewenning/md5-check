import { Test } from "./test/Test";
export class Main {
    public runTest() {
        // new Test().runTestByPath();
        // new Test().runTestByFile();
        let test = new Test();
        test.runTestSerializalDataByObject();
        test.runTestByFile();
        test.runTestByPath();
    }
}

new Main().runTest();