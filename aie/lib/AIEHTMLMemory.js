import AIEMemory from './AIEMemory';
export default class AIEHTMLMemory extends AIEMemory {
    loadScoreFromStore(id) {
        const value = localStorage.getItem(id);
        return value ? parseFloat(value) : 0;
    }
    saveScoreToStore(id, value) {
        localStorage.setItem(id, `${value}`);
    }
    removeScoreFromStore(id) {
        localStorage.removeItem(id);
    }
}
//# sourceMappingURL=AIEHTMLMemory.js.map