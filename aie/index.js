import AIEHTML from './lib/AIEHTML'
import AIEHTMLMonitor from './lib/AIEHTMLMonitor'

const initAIE = (name, selector) => {
    const aie = new AIEHTML(name, selector)
    aie.start() 
}

const exposeAIE = () => {
    AIEHTMLMonitor.exposeEnviroments() 
}

export default  {
    initAIE,
    exposeAIE
}
