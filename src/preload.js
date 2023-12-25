const { contextBridge, ipcRenderer} = require('electron')

const validChannels = ['READ_USER_LIST', 'READ_USER', 'SAVE_USER', 'UPDATE_USER', 'DELETE_USER',
                        'READ_TARIF_LIST', 'READ_TARIF', 'SAVE_TARIF', 'UPDATE_TARIF',
                        'EVERYMONTH_CHANGE']
contextBridge.exposeInMainWorld(
    'ipc', {
        send: (channel, data) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data)
            }
        },
        on: (channel, func) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args))
            }
        }
    }
)