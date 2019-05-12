import AIEMemory from './AIEMemory';
export default class AIEHTMLMemory extends AIEMemory {
    loadScoreFromStore(id: string): number;
    saveScoreToStore(id: string, value: number): void;
    removeScoreFromStore(id: string): void;
}
