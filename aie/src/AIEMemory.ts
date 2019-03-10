export default abstract class AIEMemory {
  private id: string
  private score: number

  public constructor(id: string) {
    this.id = id
    this.score = this.loadScoreFromStore(id)
  }

  public setId(id: string) {
    this.id = id
    this.removeScoreFromStore(id)
    this.saveScoreToStore(id, this.score)
  }

  public anoteEvent(goal = 1) {
    this.score += goal
    this.saveScoreToStore(this.id, this.score)
  }

  public getScore(): number {
    return this.score
  }

  public setScore(score: number) {
    return this.score = score
    this.saveScoreToStore(this.id, this.score)
  }

  public abstract loadScoreFromStore (id: string): number
  public abstract saveScoreToStore (id: string, value: number): void
  public abstract removeScoreFromStore (id: string): void
}
