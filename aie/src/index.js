import AIEHTML from './AIEHTML'
import AIEHTMLMonitor from './AIEHTMLMonitor'

const initAIE = (name, selector) => {
    const aie = new AIEHTML(name, selector)
    aie.start() 
}

const exposeAIE = () => {
    AIEHTMLMonitor.exposeEnviroments() 
}

module.export = {
    initAIE,
    exposeAIE
}
