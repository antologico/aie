import AIEHTML from './AIEHTML'
import AIEHTMLMonitor from './AIEHTMLMonitor'

const aie = new AIEHTML('TESTER0001', '#form-context')
const aie2 = new AIEHTML('TESTER0002', '#min-context')
aie.start()
aie2.start()

AIEHTMLMonitor.exposeEnviroments()
  