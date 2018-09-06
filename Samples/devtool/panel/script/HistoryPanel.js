import EventDispatcher from './EventDispatcher'

class HistoryPanel extends EventDispatcher {
    constructor (history) {    
      super()  
      this.templateTimemachine = document.getElementById('timemachine-template').innerHTML
      this.content = document.getElementById('timemachine')
      this.history = history
      this.events = {
        onApply: () => {},
        onRestore: () => {},
      }

      document.addEventListener('click', (e) => {
        const element = e.srcElement
        if (element && element.hasAttribute('aie-history-restore-index')) {
          const { prestances } = this.history.toItem(element.getAttribute('aie-history-restore-index'))
          this.events.onRestore(prestances)
        }
        if (element && element.hasAttribute('aie-history-apply-index')) {
          const { prestances } = this.history.getItem(element.getAttribute('aie-history-apply-index'))
          this.events.onApply(prestances)
        }
      }, false)
    }

    generateHistoryItem ({index, event, element, time}) {
      let htmlCode = this.templateTimemachine.replace(/{index}/g, index)
      htmlCode = htmlCode.replace(/{event}/g, event)
      htmlCode = htmlCode.replace(/{element}/g, element)
      htmlCode = htmlCode.replace(/{name}/g, name)
      htmlCode = htmlCode.replace(/{time}/i, time.toTimeString())
      return htmlCode
    }


    update () {
      this.content.innerHTML = this.history.getList().map(({time, event, element}, index) => this.generateHistoryItem({index, element, event, time})).join('')
    }
}

export default HistoryPanel
