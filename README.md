# CheckDuplicateFiles

Check duplicate files by MD5.

# 运行
npm install  
tsc  
node out/Main.js

# 测试用例
D盘新建Test文件夹，随便放入几个文件或者文件夹，再随机复制几份文件

# Usage
Usage: md5-check [options] [command] 

MD5 check duplicate files. 

Options: 
  -v, --version                         output the current version 
  -h, --help                            display help for command 

Commands: 
  info                                  print toolkit info 
  run [options] [checkpath] [savepath]  input check path to check and save path to save results 
  test 
  help [command]                        display help for command 
