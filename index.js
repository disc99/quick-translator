'use strict';

var app = require('app');
var Menu = require('menu');
var Tray = require('tray');
var BrowserWindow = require('browser-window');
var fs = require('fs');
var globalShortcut = require('global-shortcut');

require('crash-reporter').start();

var translatorWindow = null;
var appIcon = null;


app.on('ready', function() {

  // Setup Translator View
  translatorWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    show: false
  });
  translatorWindow.loadUrl('https://translate.google.co.jp/#en/ja/');
  translatorWindow.webContents.on("did-finish-load", function() {
    var jquery = fs.readFileSync(__dirname + '/jquery-2.1.4.min.js', 'utf-8');
    translatorWindow.webContents.executeJavaScript(jquery);
    translatorWindow.webContents.executeJavaScript(jquery);
    translatorWindow.webContents.executeJavaScript(fs.readFileSync(__dirname + '/main.js', 'utf-8'));
  });


  // Setup Context Menu
  appIcon = new Tray(__dirname + '/icon.png');
  appIcon.setToolTip('Quick Translator');
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Preference', click: function(){
      var preferenceWindows = new BrowserWindow({
        width: 1000,
        height: 600
      });
      preferenceWindows.loadUrl('file://' + __dirname + '/preference.html')

    }},
    { type: 'separator'},
    { label: 'Quit', click: function(){ app.quit(); }}
  ]);
  appIcon.setContextMenu(contextMenu);


  // Shortcut Settings
  globalShortcut.register('F2', function() {
    translatorWindow.show();
  });

});



