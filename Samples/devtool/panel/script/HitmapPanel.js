class HitmapPanel {
    constructor (history) {    
        this.templateTimemachine = document.getElementById('timemachine-template')
        this.image = document.getElementById('hitmap-image')
        this.input = document.getElementById('hitmap-input')
        this.search = document.getElementById('hitmap-search')
        this.printButton = document.getElementById('hitmap-print')
        this.history = history
        this.index = 0
        this.maxPrestance = 0
        this.searchItem = null
        this.imageHeight = null
        this.imageWidth = null
        this.input.addEventListener('input', (e) => this.onInputChange(e.currentTarget.value))
        this.search.addEventListener('change', (e) => this.onSearchChange(e.currentTarget.value))
        this.printButton.addEventListener('click', () => this.printSVG())

        this.templateRectagle = document.getElementById('hitmap-rectangle').innerHTML
        this.templateOption = document.getElementById('hitmap-search-option').innerHTML
        this.templatePrintable = document.getElementById('svg-print').innerHTML
    }

    onSearchChange (name) {
        this.searchItem = name
        this.onInputChange(this.input.value)
    }

    onInputChange(value) {
        const index = parseInt((this.history.getLength() - 1) * value / 100)
        this.updateImage(this.history.getItem(index))
    }

    flatTree (list, search) {
        if (!list || list.length === 0) {
          return []
        }
        if (list) {
          
            if (search) {
                return list.reduce((prev, {name, children}) => {
                    const next = (name === search) 
                        ? this.flatTree(children, null) 
                        : this.flatTree(children, search)
                    
                        return [...prev, ...next]
                }, []) 
          }

          const map = list.reduce((prev, {name, prestance, children, physicalAttribute}) => ([
            ...prev,
            { name, prestance, physicalAttribute },
            ...this.flatTree(children, null),
          ]), [])
          return map
        }
    }

    updateMaxPrestance(flatTree) {
        flatTree.forEach(({prestance}) => {
            if (prestance > this.maxPrestance) {
                this.maxPrestance = prestance
            }
        })
    }

    getFillColor (prestance) {
        const color = parseInt(prestance / this.maxPrestance  * 255)
        return 'rgb(' + [color, 30, color].join(',') + ')'
    }

    getRectagle ({physicalAttribute, prestance, name}) {
        const { left, top, width, height } = physicalAttribute

        return (left !== undefined) && prestance 
            ? this.templateRectagle
                .replace(/{left}/g, left)
                .replace(/{top}/g, top)
                .replace(/{width}/g, width)
                .replace(/{height}/g, height)
                .replace(/{fill}/g, this.getFillColor(prestance))
                .replace(/{x}/g, (left + 2))
                .replace(/{y}/g, (top + 8))
                .replace(/{name}/g, name)
            : ''
    }

    update(list) {
        const flatTree = this.flatTree(list)
        this.updateMaxPrestance(flatTree)
        this.input.value = 100
        this.onInputChange(100)
    }

    updateImage ({ state }) {
        const flatTree = this.flatTree(state, this.searchItem)
        let imageHeight = 0, imageWidth = 0
        const html = flatTree.map(({ physicalAttribute, prestance, name }) => {
            const { width, top, left , height } = physicalAttribute
            if (height + top > imageHeight) {
                imageHeight = height + top
            }
            if (left + width > imageWidth) {
                imageWidth = left + width
            }
            return physicalAttribute ? this.getRectagle ({physicalAttribute, prestance, name}) : ''
        }).join('')
        this.search.innerHTML = this.flatTree(state, null).map(
            ({ name }) => this.templateOption.replace(/{name}/g, name).replace(/{selected}/g, (this.searchItem === name ? 'selected' : ''))).join('')
        this.image.innerHTML = html
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
        this.image.setAttribute('viewBox', [0, 0, imageWidth, imageHeight].join(' '))
    }

    createNewWindowForSVG(printWindow) {
        if (this.imageWidth && this.imageHeight)
        {
            const content = this.templatePrintable
                .replace(/{content}/g, this.image.innerHTML)
                .replace(/{width}/g, this.imageWidth)
                .replace(/{height}/g, this.imageHeight)
            printWindow.document.write(content)
        }
    }

    printSVG () {
        if (this.imageWidth && this.imageHeight)
        {
           const printWindow = window.open('', '_blank', 'width=200 ,height=200', true)
           setTimeout( this.createNewWindowForSVG.bind(this, printWindow) , 500);
        }
    }
}

export default HitmapPanel
