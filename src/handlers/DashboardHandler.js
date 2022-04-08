import DashboardService from "../services/DashboardService.js";
import CardPersistenceFile from "../repositories/CardPersistenceFileRepository.js";

const cardSearchEngine = new CardPersistenceFile("./data/cards.json");

export default class DashboardHandler {

    static showDashboard() {
        try {
            const service = new DashboardService(cardSearchEngine);
            const dashboard = service.getDashboard()
            const table = []
            const rowAmount = Math.max(dashboard.pending.length, dashboard.inProgress.length, dashboard.done.length)

            for(let i = 0; i < rowAmount; i++) {
                table.push({
                    "Pending": dashboard.pending[i] != undefined ? `${dashboard.pending[i].id} - ${dashboard.pending[i].title}`: '',
                    "In Progress": dashboard.inProgress[i] != undefined ? `${dashboard.inProgress[i].id} - ${dashboard.inProgress[i].title}`: '',
                    "Done": dashboard.done[i] != undefined ? `${dashboard.done[i].id} - ${dashboard.done[i].title}`: '',
                })
            }

            console.clear()
            console.table(table)
        } catch(e) {
            console.log(`An error happened trying to show the dashboard: ${e.message}`)
        }
    }
}