import { contextBridge,ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
	start:()=>{
		ipcRenderer.send("startcore")
	},
	stop:()=>{
		ipcRenderer.send("stopcore")
	},
  getconfig:()=>{
    return ipcRenderer.invoke("getconfig")
  },
  writesub:(sub)=>{
  	ipcRenderer.send("writesub",sub)
  },
  cmd:()=>{
  	return ipcRenderer.invoke("cmd")
  },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
