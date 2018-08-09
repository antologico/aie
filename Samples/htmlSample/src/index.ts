import AIEHTML from './AIEHTML'
import AIEHTMLMonitor from './AIEHTMLMonitor'

const aie = new AIEHTML('TESTER0001', '#form-context')
aie.start()

AIEHTMLMonitor.exposeEnviroments()
  