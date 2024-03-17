const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  getVideoUrl: (data) => ipcRenderer.send('get-video-url', data),
  onMsgToRenderer: (callback) => ipcRenderer.on('on-message', (_event, value) => callback(value))
})