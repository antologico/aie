import EventDispatcher from './EventDispatcher'

class TreeMap extends EventDispatcher {
    constructor(el, width, height, data, props={area:{}, text:{} }) {
        super()
        document.getElementById(el).innerHTML = ''
        // create the svg element
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        // set props
        this.width = width
        this.height = height
        this.props = props
        this.svg.style['width'] =  '100%'
        this.svg.style['height'] = '100%'
        // diagram
        this.tree = this.createTree(data)
        this.total = this.tree.val
        this.drawVerticalBranchs('', '', this.tree.children, {
            width:this.width,
            height:this.height,
            total:this.total,
            parent: this.svg
        })
        // attach container to document
        document.getElementById(el).appendChild(this.svg);

        this.events = {
            onClick: () => {},
            onMouseOut: () => {},
            onMouseOver: () => {},
        }
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

    drawVerticalBranchs (first, name, branchs, {x = 0, y = 0, width, height, total}) {
        let offsetY = 0
        for (const branch in branchs) {
            const Y = y + offsetY
            const val = branchs[branch].val
            const percent = total ? val/total : 0
            const WIDTH = width
            const HEIGHT = height *  percent
            this.drawRect(x, Y, WIDTH, HEIGHT, branch, name, first)
            if (branchs[branch].children) {
                this.drawHorizontalBranchs (
                    first || name,
                    branch,
                    branchs[branch].children, 
                    {x, y: Y, total: val, width: WIDTH, height: HEIGHT}
                )
            }
            offsetY += HEIGHT
        }
    }

    drawHorizontalBranchs (first, name, branchs, {x = 0, y = 0, width, height, total}) {
        let offsetX = 0
        for (const branch in branchs) {
            const X = x + offsetX
            const val = branchs[branch].val
            const percent = total ? val/total : 0
            const WIDTH = width * percent
            const HEIGHT = height
            this.drawRect(X, y, WIDTH, HEIGHT, branch, name, first)
            if (branchs[branch].children) {
                this.drawVerticalBranchs (
                    first || name,
                    branch,
                    branchs[branch].children, 
                    {x: X, y, total: val, width: WIDTH, height: HEIGHT}
                )
            }
            offsetX += WIDTH
        }
    }

    drawRect (x, y, width, height, name, parent, first) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', 0);
        rect.setAttribute('y', 0);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('name', name);
        rect.setAttribute('style', this.getSVGProps('area'));
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('style', this.getSVGProps('text'));
        text.setAttribute('x', '14');
        text.setAttribute('y', '20');
        var textNode = document.createTextNode(name);
        text.appendChild(textNode);

        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('aie-name', name);
        group.setAttribute('aie-parent', parent);
        group.setAttribute('aie-first-parent', first);
        group.setAttribute('class', 'treemap-group');
        group.setAttribute('transform', `translate(${x}, ${y})`);
        group.setAttribute('width', width);
        group.setAttribute('height', height);
        group.appendChild(rect)
        group.appendChild(text)

        group.addEventListener('click', (e) => this.events.onClick({
            item: e.currentTarget.getAttribute('aie-name'),
            parent: e.currentTarget.getAttribute('aie-parent'),
            firstParent: e.currentTarget.getAttribute('aie-first-parent')
        }))
        group.addEventListener('mouseover', (e) => this.events.onMouseOver(e.currentTarget.getAttribute('aie-name')))
        group.addEventListener('mouseout', (e) => this.events.onMouseOut(e.currentTarget.getAttribute('aie-name')))
        this.svg.appendChild(group)
    }

    getSVGProps(type) {
        let style = ''
        for (const p in this.props[type]) {
            style += `${p}:${this.props[type][p]};`
        }
        return style
    }
}

export default TreeMap