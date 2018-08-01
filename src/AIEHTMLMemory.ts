import AIEMemory from './AIEMemory'

export default class AIEHTMLMemory extends AIEMemory {
  public loadScoreFromStore (id: string): number {
    const value = localStorage.getItem(id)
    return value ? parseFloat(value) : 0
  }

  public saveScoreToStore (id: string, value: number): void {
    localStorage.setItem(id, `${value}`)
  }

  public removeScoreFromStore (id: string): void {
    localStorage.removeItem(id)
  }
}
