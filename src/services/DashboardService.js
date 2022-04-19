import { STATUS_DONE, STATUS_IN_PROGRESS, STATUS_PENDING } from './CardService.js';

/**
 * @typedef {import('./CardService').Card} Card
 * 
 * @typedef {object} Dashboard
 * @property {Card[]} pending
 * @property {Card[]} inProgress
 * @property {Card[]} done
 * 
 * @typedef {object} CardSearchEngine
 * @property {function():Promise<Card[]>} all - Return all the cards in the dashboard
 * 
 * @typedef {object} DashboardPresenter
 * @property {function(Dashboard):void} present - Show the dashboard
 */
export default class DashboardService {
    /**
     * 
     * @param {CardSearchEngine} cardSearchEngine 
     * @param {DashboardPresenter} presenter 
     */
    constructor(cardSearchEngine, presenter) {
        /**@private */
        this.cardSearchEngine = cardSearchEngine;
        /**@private */
        this.presenter = presenter
    }

    /**
     * Return the current dashboard
     */
    async showDashboard() {
        const cards = await this.cardSearchEngine.all()
        const dashboard = {
            pending: cards.filter((c) => c.status == STATUS_PENDING),
            inProgress: cards.filter((c) => c.status == STATUS_IN_PROGRESS),
            done: cards.filter((c) => c.status == STATUS_DONE),
        }

        this.presenter.present(dashboard)
    }
}