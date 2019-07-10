import EventDispatcher from './EventDispatcher'
import TreeMap from './TreeMap'

class TreeMapPanel extends EventDispatcher {
    constructor (history) {    
        super()
        this.history = history
        this.historyIndex = 0
        this.searchItem = null
        this.input = document.getElementById('treemap-input')
        this.search = document.getElementById('treemap-search')
        this.input.addEventListener('input', (e) => this.onInputChange(e.currentTarget.value))
        this.search.addEventListener('change', (e) => this.onSearchChange(e.currentTarget.value))
        this.applyButton = document.getElementById('treemap-apply')
        this.restoreButton = document.getElementById('treemap-restore')

        this.applyButton.addEventListener('click', () => this.onApply())
        this.restoreButton.addEventListener('click', () => this.onRestore())
        this.templateOption = document.getElementById('chart-search-option').innerHTML
        
        this.events = {
            onApply: () => {},
            onRestore: () => {},
            onMarkChange: () => {},
        }
    }

    onSearchChange (name) {
        this.searchItem = name
        this.onInputChange(this.input.value)
    }

    onInputChange(value) {
        this.historyIndex = parseInt((this.history.getLength() - 1) * value / 100)
        this.updateTree(this.history.getItem(this.historyIndex).state)
    }

    onApply() {
        const { state } = this.history.toItem(this.historyIndex)
        this.events.onApply(state)
    }

    onRestore() {
        const { state } = this.history.toItem(this.historyIndex)
        this.events.onRestore(state)
    }

    generateTree(item) {
        if (!item.children || item.children.length === 0) {
            return item.pregnancy
        }
        return item.children.reduce((pre, c) => {
            pre[c.name] = this.generateTree(c)
            return pre
        }, {})
    }

    filter(element, search = null) {
        if (search) {
            if (element.name === search) {
                return element
            }
            for(const c in element.children){
                const result = this.filter(element.children[c], search);
                if (result) {
                    return result
                } 
            }
            return null;
        }
        if (!element.name && element.children.length === 1) {
            return element.children[0]
        }
        return element
    }  

    updateTree(children) {
        const element = this.filter({ children }, this.searchItem)
        let tree = this.generateTree(element)
        this.treeview = new TreeMap(
            'treemap-chart',
            1024,
            512,
            tree
        )
        this.treeview.registerEvent('onClick', this.onSelectElement.bind(this))
        this.treeview.registerEvent('onMouseOver', this.onMouseOver.bind(this))
        this.treeview.registerEvent('onMouseOut', this.onMouseOut.bind(this))
    } 

    onMouseOver (name) {
        this.events.onMarkChange ({name, value: true})
    }

    onMouseOut (name) {
        this.events.onMarkChange ({ name, value: false })
    }

    onSelectElement (info) {
        if (info.firstParent) {
            this.search.value = info.firstParent
            this.onSearchChange(info.firstParent)
        }
    }


    flatTree (list) {
        if (!list || list.length === 0) {
          return []
        }
        if (list) {
          const map = list.reduce((prev, {name, pregnancy, children}) => ([
            ...prev,
            { name, pregnancy, children },
            ...this.flatTree(children, null),
          ]), [])
          return map
        }
    }

    updateSearch(state) {
        this.search.innerHTML = this.flatTree(state).map(
            ({ name, children }) => {
                if (children.length) {
                    return this.templateOption.replace(/{name}/g, name).replace(/{selected}/g, (this.searchItem === name ? 'selected' : ''))
                }
                return ''
            }).join('')
    } 
    update (list) {
        if (list.getLastest()) {
            const state = list.getLastest().state
            this.updateSearch(state)
            this.updateTree(state)
            this.input.value = 100
            this.onInputChange(100)
        }
    }
}

export default TreeMapPanel
