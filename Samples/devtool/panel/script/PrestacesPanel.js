
class PrestacesPanel {
    constructor () {
        this.templateItem = document.getElementById('item-template').innerHTML
        this.templateList = document.getElementById('list-template').innerHTML
        this.container = document.getElementById('container')
        this.loader = document.getElementById('loader')
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
      
    getPrestace (prestance) {
        return prestance ? prestance.toFixed(4) : ''
    }
      
    generateItem ({ name, prestance, children}, id) {
        let htmlCode = this.templateItem.replace(/{id}/g, name)
        htmlCode = htmlCode.replace(/{name}/g, name)
        htmlCode = htmlCode.replace(/{value}/i, this.getPrestace(prestance))
        htmlCode = htmlCode.replace(
          /{content}/i,
          this.generateList(children, id))
      
        return htmlCode
      }
      
    drawTable(prestances) {
        if (prestances) {
          loader.classList.add('hide')
          this.container.innerHTML = this.generateList(prestances, '0')
        }
      }
      
    flatTree (list) {
        if (!list || list.length === 0) {
          return []
        }
        if (list) {
          const map = list.reduce((prev, {name, prestance, children}) => ([
            ...prev,
            ...this.flatTree(children),
            { name, prestance },
          ]), [])
          return map
        }
      }
      
    updateValues(list) {
        if (!list || list.length === 0) {
          return null
        }
        const valueList = this.flatTree(list)
        const minVal = valueList.map(a => a.prestance).reduce((a, b) => Math.min(a, b), 1)
        const maxVal = valueList.map(a => a.prestance).reduce((a, b) => Math.max(a, b), 0)
        if (list) {
          valueList.map(({name, prestance}) => {
            const el = document.getElementById(`value_${name}`)
            const arrowEl = document.getElementById(`arrow_${name}`)
            if (el) {
              const color = 'rgb(100, 100, ' + parseInt(255*(prestance-minVal)/(maxVal-minVal)) + ')'
              el.style.color = color
              arrowEl.style.color = color
              const prevValue = parseFloat(el.innerHTML)
              if (prevValue > prestance) {
                arrowEl.innerHTML = '&darr;'
              }
              if (prevValue < prestance) {
                arrowEl.innerHTML = '&uarr;'
              }
              el.innerHTML = this.getPrestace(prestance)
            }
          })
        }
      }
}

export default PrestacesPanel
