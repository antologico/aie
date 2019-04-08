
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
            activeMark: () => {},
            reciveMark: () => {},
            onReceiveUpdate: () => {},
            onClean: () => {},
        }

        this.port.onMessage.addListener((message) => {
            if (message.target !== 'panel') {
              return
            }
            switch(message.action) {
              case 'aie-update':
              console.log(message)
                this.receiveUpdate(message)
                break
              case 'aie-reset':
                this.events.activeMark (false)
                break
              case 'aie-mark':
                this.events.reciveMark (message.name, false)
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
        const { state, event, element } = JSON.parse(detailJSON)
        
        this.events.onReceiveUpdate({
            event,
            state,
            element,
        })
        
        if (this.init == false) {
          this.init = true
          this.events.initValues(state)
        } else {
          this.events.updateValues(state)
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
        this.init = false
        this.events.onClean()
        this.send({
            action: 'aie-connect',
            name: name,
        })
    }

    restoreScores (state = null) {
        this.send({
            action: 'aie-restore',
            state,
        })
    }

    applyState (state = null) {
        this.send({
            action: 'aie-apply',
            state,
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
