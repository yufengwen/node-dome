// node核心模块
// http: 提供HTTP服务器功能
//url: 解析URL
//fs: 与文件系统的交互
//queryString: 解析URL的查询字符串
//child_process: 新建子进程
//util: 实用小工具
//path： 处理文件路径
//crypto: 提供加密解密功能， 基本是对OpneSSL的包装

// 自定义模块
var out = new Object();

function print(string) {
	console.log(string);
}

out.print = print;

module.exports = out;