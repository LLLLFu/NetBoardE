import path from 'path'
import fs from 'fs-extra'
import {shell} from 'electron'
import {spawn} from "child_process"
import process from "process"
import {app} from 'electron'
var serverProcess=null;
// 拉起特定应用程序
  // 启动路径
  let cmdPath = app.isPackaged?
  path.join(process.cwd(),"/resources/app.asar.unpacked/resources"):
  path.join(__dirname,"../../resources");
  // 启动后台服务的命令
  var cmdStr = cmdPath+"\\clash-netboard.exe ";
  var parameters = ["-f","config.yaml","-d","."];
  var cmdStr2 = cmdPath+"\\sysproxy.exe";
  var parameters2 = ["on","127.0.0.1","17890"];
  var parameters3 = ["off","127.0.0.1","17890"];

function startServer(){
  try{
  	runExec()
  }catch(e){
  	console.log(e)
  }

  function runExec(){
  // 在启动后台服务前闲检测关闭一遍后台服务，防止开启多个后台服务
  	stopServer();
    spawn(cmdStr2,parameters2,{cwd:cmdPath});
    serverProcess = spawn(cmdStr,parameters,{cwd:cmdPath})
    // 启动成功的输出
    serverProcess.stdout.on("data",function(data){
      console.log("success！ stdout:" + data)
    })
    // 发生错误的输出
    serverProcess.stderr.on("data",function(data){
      console.log("stderr:" +  data)
	 
    })
    // 退出后的输出
    serverProcess.on("close",function(code){
      console.log("out code:" + code)
    })
  }
}
// 关闭后台服务
function stopServer(){
  spawn(cmdStr2,parameters3,{cwd:cmdPath});
  const kill = require("tree-kill")
  if(serverProcess){
   console.log("kill server process , serverProcess.pid-->",serverProcess.pid);

    kill(serverProcess.pid,"SIGTERM",function(){
      serverProcess = null;
     console.log("close...")
    })
  }
}
export {
	startServer,
	stopServer,
  cmdStr
}
