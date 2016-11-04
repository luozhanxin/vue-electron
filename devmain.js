'use strict';
const electron = require('electron');
const app = electron.app;  // 控制App生命周期的模块
const BrowserWindow = electron.BrowserWindow;  // 创建原生窗口的模块

// 保持对窗口对象的全局引用。如果不这么做的话，JavaScript垃圾回收的时候窗口会自动关闭
var mainWindow = null;

// 当所有的窗口关闭的时候退出应用
app.on('window-all-closed', function() {
  // 在 OS X 系统里，除非用户按下Cmd + Q，否则应用和它们的menu bar会保持运行
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 当应用初始化结束后调用这个方法，并渲染浏览器窗口
app.on('ready', function() {
  // 创建一个窗口
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // 加载index.js
  mainWindow.loadURL('file://' + __dirname + '/dist/index.html');

  // 打开 DevTools
  mainWindow.webContents.openDevTools();

  // 窗口关闭时触发
  mainWindow.on('closed', function() {
    // 如果你的应用允许多个屏幕，那么可以把它存在Array里。
    // 因此删除的时候可以在这里删掉相应的元素
    mainWindow = null;
  });
});

var handleStartupEvent = function () {
  if (process.platform !== 'win32') {
    return false;
  }

  var squirrelCommand = process.argv[1];

  switch (squirrelCommand) {
    case '--squirrel-install':
    case '--squirrel-updated':
      install();
      return true;
    case '--squirrel-uninstall':
      uninstall();
      app.quit();
      return true;
    case '--squirrel-obsolete':
      app.quit();
      return true;
  }


  function install() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--createShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }
   function uninstall() {
    var cp = require('child_process');    
    var updateDotExe = path.resolve(path.dirname(process.execPath), '..', 'update.exe');
    var target = path.basename(process.execPath);
    var child = cp.spawn(updateDotExe, ["--removeShortcut", target], { detached: true });
    child.on('close', function(code) {
        app.quit();
    });
  }

};

if (handleStartupEvent()) {
  return;
}