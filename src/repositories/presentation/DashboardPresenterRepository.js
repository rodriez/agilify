/**
 * @typedef {import('../../services/DashboardService').DashboardPresenter} DashboardPresenter
 * 
 * @implements {DashboardPresenter}
 */
export default class DashboardPresenterRepository {

    /**
     * Show the dashboard in the console
     * 
     * @param {import('../../services/DashboardService').Dashboard} dashboard 
     */
    present(dashboard) {
        const rowAmount = Math.max(dashboard.pending.length, dashboard.inProgress.length, dashboard.done.length)
        const table = (rowAmount > 0) ? this.toTable(dashboard, rowAmount) : this.emptyTable() 

        console.clear()
        console.table(table)
    }

    /**@private */
    toTable(dashboard, rows) {
        return Array(rows).fill(0).map((_, i) => {
            return {
                "Pending": this.presentCard(dashboard.pending[i]),
                "In Progress": this.presentCard(dashboard.inProgress[i]),
                "Done": this.presentCard(dashboard.done[i]),
            }
        })
    }

    /**@private */
    emptyTable() {
        return [
            {
                "Pending": "...",
                "In Progress": "...",
                "Done": "..."
            }
        ]
    }

    /**
     * @private
     */
    presentCard(card) {
        if (card != undefined) {
            return `${card.id} - ${card.title}`
        } 
        
        return ''
    }
}