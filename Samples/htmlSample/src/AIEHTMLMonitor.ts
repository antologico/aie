import AIEMonitor from './AIEMonitor'

export default class AIEHTMLMonitor extends AIEMonitor {
    static interval: any

    static exposeEnviroments (eventName: string = 'aie-update', mileseconds: number = 1000): void {
        AIEHTMLMonitor.interval && clearInterval(AIEHTMLMonitor.interval)
        AIEHTMLMonitor.interval = setInterval(() => {
          if (AIEMonitor.getPrestances().length) {
            const prestances = JSON.stringify(AIEMonitor.getPrestances())
            if (prestances) {
                var event = new CustomEvent(eventName, { 'detail': prestances });
                (<any>window).dispatchEvent(event);
            }
          }
        }, mileseconds)
    }
    
    static stopExposeEnviroments (): void {
        clearInterval(AIEHTMLMonitor.interval)
    }
}
