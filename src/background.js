'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import { initDb } from '../database/database.js'
import Tarif from '../database/Models/TarifModel.js'
import User from '../database/Models/UserModel.js'
const path = require('path')

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      preload: './preload.js'
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  initDb()
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('READ_USER_LIST', (event)=>{
  User.findAll().then(rows => {
    event.returnValue = rows
  }).catch(err => {
    console.error(err)
  })
})

ipcMain.on('READ_USER', (event, data) => {
  User.findById(data.id).then(rows => {
    event.returnValue = rows
  }).catch(err => {
    console.error(err)
  })
})

ipcMain.on('READ_TARIF_LIST', (event) =>{
  Tarif.findAll().then(rows => {
    event.returnValue = rows
  }).catch(err => {
    console.error(err)
  })
})

ipcMain.on('READ_TARIF', (event, data) => {
  Tarif.findById(data.id).then(rows => {
    event.returnValue = rows
  }).catch(err => {
    console.error(err)
  })
})

ipcMain.on('SAVE_USER', (event, data) => {
  new User(data.name, data.phone, data.pasport_id, data.tarif_id).save()
  User.findAll().then(rows => {
    event.reply('READ_USER_LIST', rows)
  }).catch(err => {
    console.error(err)
  })
})

ipcMain.on('UPDATE_USER', (event, data) => {
  new User(data.name, data.phone, data.pasport_id, data.tarif_id, data.id).update()
})

ipcMain.on('UPDATE_TARIF', (event, data) => {
  new Tarif(data.title, data.price, data.minute, data.sms, data.mobileInternet, data.homeInternet, data.id).update()
})

ipcMain.on('DELETE_USER', (event, data) => {
  User.delete(data.id)
})

ipcMain.on('SAVE_TARIF', (event, data) => {
  new Tarif(data.title, data.price, data.minute, data.sms, data.phoneInternet, data.homeInternet).save()
  Tarif.findAll().then(rows => {
    event.reply('READ_TARIF_LIST', rows)
  }).catch(err => {
    console.error(err)
  })
})

ipcMain.on('EVERYMONTH_CHANGE', (event, data) => {
  User.get_everymonth_change(data.tarif_id).then(rows => {
    event.returnValue = rows
  }).catch(err => {
    console.error(err)
  })
})
