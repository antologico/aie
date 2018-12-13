import AIEHTML from './AIEHTML'
import AIEHTMLMonitor from './AIEHTMLMonitor'

function initAIE (name: string, selector: string) {
    const aie = new AIEHTML(name, selector)
    aie.start()
    AIEHTMLMonitor.exposeEnviroments() 
}

(<any>window).initAIE = initAIE
