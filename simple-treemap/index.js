class TreeMap {
    constructor(el, width, height, data, props={area:{}, text:{} }) {
        document.getElementById(el).innerHTML = ''
        // create the svg element
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        // set props
        this.width = width
        this.height = height
        this.props = {
            area: Object.assign({
                    stroke: 'red',
                    fill: '#EEE',
                    'stroke-width': '1',
                },
                props.area),
            text: Object.assign({
                    fill: 'red',
                    'font-size': '8px',
                },
                props.text)
        }
        this.svg.style['width'] =  '100%'
        this.svg.style['height'] = '100%'
        // diagram
        this.tree = this.createTree(data)
        this.total = this.tree.val
        this.drawHorizontalBranchs(this.tree.children, {
            width:this.width,
            height:this.height,
            total:this.total,
            parent: this.svg
        })
        // attach container to document
        document.getElementById(el).appendChild(this.svg);
    }


    createBranch (data) {
        const children = this.inspectData(data)
        return {
            val: Object.values(children).reduce((p, n) => p + n.val, 0),
            children,
        }
    }
    inspectData (data) {
        let tree = {}
        for (const el in data) {
            if (!isNaN(data[el])) {
                const val = parseFloat(data[el])
                tree[el] = { val }
            } else {
                tree[el] = this.createBranch (data[el])
            }
        }
        return tree
    }

    createTree (data) {
        return this.createBranch(data)
    }

    drawVerticalBranchs (branchs, {x = 0, y = 0, width, height, total}) {
        let offsetY = 0
        for (const branch in branchs) {
            const Y = y + offsetY
            const val = branchs[branch].val
            const percent = val/total
            const WIDTH = width
            const HEIGHT = height *  percent
            this.drawRect(x, Y, WIDTH, HEIGHT, branch)
            if (branchs[branch].children) {
                this.drawHorizontalBranchs (
                    branchs[branch].children, 
                    {x, y: Y, total: val, width: WIDTH, height: HEIGHT}
                )
            }
            offsetY += HEIGHT
        }
    }

    drawHorizontalBranchs (branchs, {x = 0, y = 0, width, height, total}) {
        let offsetX = 0
        for (const branch in branchs) {
            const X = x + offsetX
            const val = branchs[branch].val
            const percent = val/total
            const WIDTH = width * percent
            const HEIGHT = height
            this.drawRect(X, y, WIDTH, HEIGHT, branch)
            if (branchs[branch].children) {
                this.drawVerticalBranchs (
                    branchs[branch].children, 
                    {x: X, y, total: val, width: WIDTH, height: HEIGHT}
                )
            }
            offsetX += WIDTH
        }
    }

    drawRect (x, y, width, height, name) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('name', name);
        rect.setAttribute('style', this.getSVGProps('area'));
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('style', this.getSVGProps('text'));
        text.setAttribute('x', x+10);
        text.setAttribute('y', y+10);
        var textNode = document.createTextNode(name);
        text.appendChild(textNode);
        
        this.svg.appendChild(rect)
        this.svg.appendChild(text)
    }

    getSVGProps(type) {
        let style = ''
        for (const p in this.props[type]) {
            style += `${p}:${this.props[type][p]};`
        }
        return style
    }
}

export { TreeMap } 