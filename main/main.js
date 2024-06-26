const { app, BrowserWindow,ipcMain } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;
const ipc = ipcMain;
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    autoHideMenuBar:true,
    webViewTag:true,
    webPreferences: {
      webviewTag:true,
      nodeIntegration:true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon:__dirname+'../public/arc_logo.png'
  });
  win.setIcon(path.join(process.cwd(),'/public/Arc.png'));
  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    win.loadURL("http://localhost:3000");
    win.webContents.on("did-fail-load", (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
}

app.on("ready", () => {
    createWindow();
});
ipc.on("close",()=>{
    app.quit();
})
app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});