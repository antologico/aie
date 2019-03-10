import AIEHTML from './AIEHTML'
import AIEHTMLMonitor from './AIEHTMLMonitor'

function initAIE (name: string, selector: string) {
    const aie = new AIEHTML(name, selector)
    aie.start() 
}

(<any>window).initAIE = initAIE

function exposeAIE() {
    AIEHTMLMonitor.exposeEnviroments() 
}

export {
    AIEHTML,
    AIEHTMLMonitor,
    initAIE,
    exposeAIE
}