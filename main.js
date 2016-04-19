// var app = require('app');  // Module to control application life.
// var BrowserWindow = require('browser-window');  // Module to create native browser window.
// require('electron-debug')({ showDevTools: true });
// // Report crashes to our server.
// require('crash-reporter').start();

// // Keep a global reference of the window object, if you don't, the window will
// // be closed automatically when the javascript object is GCed.
// var mainWindow = null;

// // Quit when all windows are closed.
// app.on('window-all-closed', function() {
//     if (process.platform != 'darwin')
//         app.quit();
// });

// // This method will be called when Electron has done everything
// // initialization and ready for creating browser windows.
// app.on('ready', function() {
//     // Create the browser window.
//     mainWindow = new BrowserWindow({ width: 800, height: 600 });

//     // and load the index.html of the app.
//     mainWindow.loadUrl('file://' + __dirname + '/index.html');

//     // Emitted when the window is closed.
//     mainWindow.on('closed', function() {
//         // Dereference the window object, usually you would store windows
//         // in an array if your app supports multi windows, this is the time
//         // when you should delete the corresponding element.
//         mainWindow = null;
//     });

//     debugger;

//     // var document = mainWindow;
//     // var btn = document.querySelector('.applybutton');
//     // btn.addEventListener('click', function() {
//     //     debugger;
//     //     console.log('helllel');

//     // })
// });




var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});


app.on('ready', function() {
  mainWindow = new BrowserWindow();
  mainWindow.maximize();
   mainWindow.openDevTools();

  mainWindow.loadURL('file://' + __dirname + '/index.html');
  
  mainWindow.on('closed', function() {    mainWindow = null;  });
  
  // Tell the Render code that dev Tools has loaded
  // - Note: Break point engine is still not running though...
  mainWindow.on('devtools-opened', function() {
    console.log("dev tools is now open!")
    mainWindow.webContents.send('devtools-opened');
  });
});


