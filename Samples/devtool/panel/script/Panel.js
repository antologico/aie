import EventDispatcher from './EventDispatcher'

class Panel extends EventDispatcher {
    constructor() {
        super()
        this.events = {
            onMarkChange: () => {},
            onDeleteHistory: () => {},
            onConnect: () => {},
            onActiveMarksChange: () => {},
            onApply: () => {},
        }

        document.addEventListener('mouseover', (e) => this.onMouseOver(e.srcElement))
        document.addEventListener('mouseout', (e) => this.onMouseOut(e.srcElement))
          
        document.getElementById('active-marks-checker').addEventListener('change', (e) =>
            this.events.onActiveMarksChange(e.srcElement.checked ? 'aie-active-mark' : 'aie-unactive-mark')
          , false)
          
        document.getElementById('toolbar-delete').addEventListener('click', (e) => {
            this.events.onDeleteHistory()
          }, false)
        document.getElementById('toolbar-connect').addEventListener('click', (e) => {
            this.events.onConnect()
          }, false)
          
        document.getElementById('toolbar-apply').addEventListener('click', (e) => {
            this.events.onApply()
          }, false)
          
          document.getElementById('timemachine-checker').addEventListener('change', (e) => {
            if (e.srcElement.checked) {
              document.getElementById('timemachine').classList.remove('hide')
              document.getElementById('container').classList.add('hide')
            } else {
              document.getElementById('timemachine').classList.add('hide')
              document.getElementById('container').classList.remove('hide')
            }
          }, false)
    }

    updateMemoryField(history) {
        document.getElementById('memorySize').innerHTML = history.getConsumedMemory()
    }

    changeMark (name, value) {
        const el = document.getElementById('label_' + name)
        if (el) {
            value ? el.classList.add('mark') : el.classList.remove('mark')
        }
    }

    onMouseOver (element) {
        if (element.hasAttribute('aie-name')) {
            this.events.onMarkChange ({name: element.getAttribute('aie-name'), value: true})
        }
    }

    onMouseOut (element) {
        if (element.hasAttribute('aie-name')) {
            this.events.onMarkChange ({ name: element.getAttribute('aie-name'), value: false })
        }
    }
}

export default Panel
