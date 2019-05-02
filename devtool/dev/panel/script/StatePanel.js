
class StatePanel {
    constructor () {
        this.templateItem = document.getElementById('item-template').innerHTML
        this.propertyItem = document.getElementById('item-property').innerHTML
        this.propertyTrigger = document.getElementById('item-trigger').innerHTML
        this.templateList = document.getElementById('list-template').innerHTML
        this.table = document.getElementById('state-table')
    }

    clean () {
      this.history = []
      this.events.change(this)
    }

    generateList (list, id) {
        if (!list || list.length === 0) {
          return ''
        }
        let htmlCode = this.templateList.replace(
          /{items}/,
          list.map((item, key) => this.generateItem(item, `${id}_${key}`)).join('')
        )
        return htmlCode
      }

    getPrestace (pregnancy) {
        return pregnancy ? pregnancy.toFixed(4) : ''
    }
      
    generateItem ({ name, pregnancy, properties, children, triggers}, id) {
        let htmlCode = this.templateItem.replace(/{id}/g, name)
        htmlCode = htmlCode.replace(/{name}/g, name)
        htmlCode = htmlCode.replace(
          /{properties}/g,
          triggers.map(property => this.propertyItem.replace(/{property}/i, property)).join(''))
        htmlCode = htmlCode.replace(
          /{triggers}/g,
          triggers.map(trigger => this.propertyTrigger.replace(/{trigger}/i, trigger)).join(''))
        htmlCode = htmlCode.replace(/{value}/i, this.getPrestace(pregnancy))
        htmlCode = htmlCode.replace(
          /{content}/i,
          this.generateList(children, id))
        return htmlCode
      }
      
    drawTable(state) {
        if (state) {
          this.table.innerHTML = this.generateList(state, '0')
        }
      }

    flatTree (list) {
        if (!list || list.length === 0) {
          return []
        }
        if (list) {
          const map = list.reduce((prev, {name, pregnancy, children}) => ([
            ...prev,
            ...this.flatTree(children),
            { name, pregnancy },
          ]), [])
          return map
        }
      }
      
    updateValues(list) {
        if (!list || list.length === 0) {
          return null
        }
        const valueList = this.flatTree(list)
        const minVal = valueList.map(a => a.pregnancy).reduce((a, b) => Math.min(a, b), 1)
        const maxVal = valueList.map(a => a.pregnancy).reduce((a, b) => Math.max(a, b), 0)
        if (list) {
          valueList.map(({name, pregnancy}) => {
            const el = document.getElementById(`value_${name}`)
            const arrowEl = document.getElementById(`arrow_${name}`)
            if (el) {
              const color = 'rgb(' + parseInt(255*(pregnancy-minVal)/(maxVal-minVal)) + ', 200, 200)'
              el.style.color = color
              arrowEl.style.color = color
              const prevValue = parseFloat(el.innerHTML)
              if (prevValue > pregnancy) {
                arrowEl.innerHTML = '&darr;'
              } else if (prevValue < pregnancy) {
                arrowEl.innerHTML = '&uarr;'
              } else if (!prevValue) {
                arrowEl.innerHTML = ''
              } else {
                arrowEl.innerHTML = '='
              }
              el.innerHTML = this.getPrestace(pregnancy)
            }
          })
        }
      }
}

export default StatePanel
