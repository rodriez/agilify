import DashboardService from "../services/DashboardService.js";
import CardPersistenceSqlRepository from "../repositories/sql/CardPersistenceSqlRepository.js";
import DashboardPresenterRepository from "../repositories/presentation/DashboardPresenterRepository.js";

const cardSearchEngine = new CardPersistenceSqlRepository();
const presenter = new DashboardPresenterRepository()

export default class DashboardHandler {

    static async showDashboard() {
        try {
            const service = new DashboardService(cardSearchEngine, presenter);
            
            await service.showDashboard()
        } catch(e) {
            console.log(`An error happened trying to show the dashboard: ${e.message}`)
        }
    }
    
}