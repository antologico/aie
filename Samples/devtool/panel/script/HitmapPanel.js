class HitmapPanel {
    constructor (history) {    
        this.templateTimemachine = document.getElementById('timemachine-template')
        this.image = document.getElementById('hitmap-image')
        this.input = document.getElementById('hitmap-input')
        this.history = history
        this.index = 0
        this.maxPrestance = 0
        this.input.addEventListener('input', (e) => this.onInputChange(e.currentTarget.value))
    }

    flatTree (list) {
        if (!list || list.length === 0) {
          return []
        }
        if (list) {
          const map = list.reduce((prev, {name, prestance, physicalAttribute, children}) => ([
            ...prev,
            ...this.flatTree(children),
            { name, prestance, physicalAttribute },
          ]), [])
          return map
        }
    }

    onInputChange(value) {
        const index = parseInt((this.history.getLength() - 1) * value / 100)
        this.updateImage(this.history.getItem(index))
    }

    flatTree (list) {
        if (!list || list.length === 0) {
          return []
        }
        if (list) {
          const map = list.reduce((prev, {name, prestance, children, physicalAttribute}) => ([
            ...prev,
            { name, prestance, physicalAttribute },
            ...this.flatTree(children),
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

    getRectagle (physicalAttribute, prestance) {
        const { left, top, width, height } = physicalAttribute

        return left && prestance 
            ? '<rect x="' + left + '" \
                y="' + top +'" \
                width="' + width +'" \
                height="' + height +'" \
                fill="'+ this.getFillColor(prestance) +'" />' 
            : ''
    }

    update(list) {
        const flatTree = this.flatTree(list)
        this.updateMaxPrestance(flatTree)
        this.input.value = 100
        this.onInputChange(100)
    }

    updateImage ({ state }) {
        const flatTree = this.flatTree(state)
        let imageHeight = 0, imageWidth = 0
        const html = flatTree.map(({ physicalAttribute, prestance }) => {
            const { width, top, left , height } = physicalAttribute
            if (height + top > imageHeight) {
                imageHeight = height + top
            }
            if (left + width > imageWidth) {
                imageWidth = left + width
            }
            return physicalAttribute ? this.getRectagle (physicalAttribute, prestance) : ''
        }).join('')
        this.image.innerHTML = html
        this.image.setAttribute('viewBox', [0, 0, imageWidth, imageHeight].join(' '))
    }
}

export default HitmapPanel
