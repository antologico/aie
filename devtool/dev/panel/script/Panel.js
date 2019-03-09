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
            onFilterHitmap: () => {},
        }
        this.loader = document.getElementById('loader')
        this.container = document.getElementById('container')
        this.hitmapChecker = document.getElementById('hitmap-checker')

        document.addEventListener('mouseover', (e) => this.onMouseOver(e.srcElement))
        document.addEventListener('mouseout', (e) => this.onMouseOut(e.srcElement))
        document.addEventListener('click', (e) => this.onClick(e.srcElement))
          
        document.getElementById('active-marks-checker').addEventListener('change', (e) =>
            this.events.onActiveMarksChange(e.srcElement.checked)
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

    activeMark (value) {
        document.getElementById('active-marks-checker').checked = value
    }

    onMouseOver (element) {
        if (element.hasAttribute('aie-name')) {
            this.events.onMarkChange ({name: element.getAttribute('aie-name'), value: true})
        }
    }

    reciveValues () {
        this.loader.classList.add('hide')
        this.container.classList.remove('hide')
    }

    onMouseOut (element) {
        if (element.hasAttribute('aie-name')) {
            this.events.onMarkChange ({ name: element.getAttribute('aie-name'), value: false })
        }
    }

    onClick (element) {
        if (element.hasAttribute('hitmap-filter')) {
            this.events.onFilterHitmap (element.getAttribute('hitmap-filter'))
            this.hitmapChecker.checked = true
        }
    }
}

export default Panel
