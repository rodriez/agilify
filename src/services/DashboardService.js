import { STATUS_DONE, STATUS_IN_PROGRESS, STATUS_PENDING } from './CardService.js';

/**
 * @typedef {import('./CardService').Card} Card
 * 
 * @typedef {object} CardSearchEngine
 * @property {function():Card[]} all - Return all the cards in the dashboard
 */
export default class DashboardService {
    /**
     * 
     * @param {CardSearchEngine} cardSearchEngine 
     */
    constructor(cardSearchEngine) {
        /**@private */
        this.cardSearchEngine = cardSearchEngine;
    }

    /**
     * Return the current dashboard
     * 
     * @typedef {object} Dashboard
     * @property {Card[]} pending
     * @property {Card[]} inProgress
     * @property {Card[]} done
     * 
     * @returns {Dashboard}
     */
    getDashboard() {
        const cards = this.cardSearchEngine.all()

        return {
            pending: cards.filter((c) => c.status == STATUS_PENDING),
            inProgress: cards.filter((c) => c.status == STATUS_IN_PROGRESS),
            done: cards.filter((c) => c.status == STATUS_DONE),
        }
    }
}