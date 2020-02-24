const {app, BrowserWindow, screen} = require('electron')
const path = require('path')
app.addRecentDocument(path.join(__dirname,"index.html"))
app.setUserTasks([
    {
        program: process.execPath,
        arguments: './node_modules/electron/dist/electron.exe ./main',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'New Window',
        description: 'Create a new window'
    }
])
function createWindow () {
    // Create the browser window.
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const mainWindow = new BrowserWindow({
        width: (width*0.8), height: (height*0.8),
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadFile('index.html')
    let x = 0.0;
    setInterval(function () {
        if (x<1.0) {
            x += 0.1
        }
        else {
            x=0.0
        }
        mainWindow.setProgressBar(x)
    }, 500)
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
