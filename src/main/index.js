import { app, shell, BrowserWindow ,ipcMain,Tray, Menu, nativeImage} from 'electron'
import { join } from 'path'
import path from 'node:path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/netboard.png'
import {startServer,stopServer,cmdStr} from "./Core/StartService.js";
import {getConfig,writeSub} from "./Core/getConfig.js";
let cmdPath = app.isPackaged?
  path.join(process.cwd(),"/resources/app.asar.unpacked/resources"):
  path.join(process.cwd(),"/resources");
function createWindow() {

  const mainWindow = new BrowserWindow({
    width: 1020,
    height: 690,
    frame:true,
    autoHideMenuBar: false,
    icon:cmdPath+'/netboard.png',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },

  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })


  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}


app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')


  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  const icon = nativeImage.createFromPath(cmdPath+'/netboard.png')
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开控制面板', role: 'hide',click:()=>{createWindow()} },
    { label: '退出应用', role: 'quit',click:()=>{ app.quit()} },
  ])

  tray.setContextMenu(contextMenu)
  tray.setToolTip('Netboard Controller')
  tray.setTitle('Netboard Controller')

  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})


app.on('window-all-closed', () => {

})
ipcMain.on("startcore",()=>{
	startServer();
})
ipcMain.on("stopcore",()=>{
	stopServer();
})
ipcMain.handle("getconfig",()=>{
  return getConfig();
});
ipcMain.on("writesub",(event,sub)=>{
  console.log(sub)
  writeSub(sub);
});
ipcMain.handle("cmd",()=>{
  return cmdStr;
});

