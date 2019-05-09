import AIEMemory from './AIEMemory';
import Warehouse from './Warehouse';
export default class AIEHTMLMemory extends AIEMemory {
    private name;
    constructor(name: string);
    getWarehouseAvailble(): Warehouse;
    loadScoreFromStore(id: string): number;
    saveScoreToStore(id: string, value: number): void;
    removeScoreFromStore(id: string): void;
}
