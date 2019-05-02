import AIEHTML from './lib/AIEHTML'
import AIEHTMLMonitor from './lib/AIEHTMLMonitor'

const initAIE = (name, selector) => {
    const aie = new AIEHTML(name, selector)
    aie.start() 
}

const exposeAIE = (serverUrl = null, userName = null) => {
    AIEHTMLMonitor.exposeEnviroments(serverUrl, userName)
}

export default  {
    initAIE,
    exposeAIE
}
