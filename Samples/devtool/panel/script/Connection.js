
import EventDispatcher from './EventDispatcher'

class Connection extends EventDispatcher {
    constructor() {
        super()
        this.tabId = chrome.devtools.inspectedWindow.tabId
        this.init  = false
        this.port = chrome.runtime.connect(null, { name: 'panel' })
        this.updating = false
        this.events = {
            updateValues: () => {},
            initValues: () => {},
            reciveMark: () => {},
            onReceiveUpdate: () => {},
        }

        this.port.onMessage.addListener((message) => {
            if (message.target !== 'panel') {
              return
            }
            switch(message.action) {
              case 'aie-update':
                this.receiveUpdate(message)
                break
              case 'aie-mark':
                this.events.reciveMark (message.name, true)
                break
              case 'aie-unmark':
                this.events.reciveMark (message.name, false)
                break
            }
        })
    }

    begin () {
        this.post({ action: 'init' })
    }

    post(message) {
        message.tabId = this.tabId
        message.target = 'content'
        this.port.postMessage(message)
    }   

    send(message) {
        message.tabId = this.tabId
        message.target = 'content'
        chrome.runtime.sendMessage(message)
    }      

    receiveUpdate ({ detail: detailJSON }) {
        if (this.updating || !detailJSON) {
          return
        }
        
        this.updating = true
        const { prestances, event, element } = JSON.parse(detailJSON)
        
        this.events.onReceiveUpdate({
            event,
            prestances,
            element,
        })
        
        if (this.init == false) {
          this.init = true
          this.events.initValues(prestances)
        } else {
          this.events.updateValues(prestances)
        }
        this.updating = false
    }

    sendMark ({ name, value }) {
        this.send({
            action: value ? 'aie-mark' : 'aie-unmark',
            name: name,
        })
    }

    sendConnect () {
        this.send({
            action: 'aie-connect',
            name: name,
        })
    }

    restoreScores (prestances = null) {
        this.send({
            action: 'aie-restore',
            prestances,
        })
    }

    applyPrestances (prestances = null) {
        this.send({
            action: 'aie-apply',
            prestances,
        })
    }

    activeMarks (value) {
        this.send({
            action: value? 'aie-active-mark' : 'aie-unactive-mark',
        })
    }

    deleteHistory() {
        this.send({
            action: 'aie-trash',
        })
    }
      
}

export default Connection
