import CardService, { STATUS_DONE, STATUS_IN_PROGRESS, STATUS_PENDING } from "../services/CardService.js";
import UserPersistenceSqlRepository from "../repositories/sql/UserPersistenceSqlRepository.js";
import CardPersistenceSqlRepository from "../repositories/sql/CardPersistenceSqlRepository.js";
import DashboardHandler from "./DashboardHandler.js";
import NotificationRepository from "../repositories/notifications/NotificationRepository.js";

const notificationRepo = new NotificationRepository()
const cardPersistence = new CardPersistenceSqlRepository(notificationRepo)
const userPersistence = new UserPersistenceSqlRepository()

export default class CardHandler {
    
    /**
     * 
     * @param {*} req 
     */
    static async addCard(req) {
        const addCardRequest = {
            title: req.title,
            userId: req.userId,
            description: req.desc
        }

        try {
            const service = new CardService(cardPersistence, userPersistence);
            await service.addCard(addCardRequest)

            await DashboardHandler.showDashboard()
        } catch(e) {
            console.error(`An error has ocurred trying to create the card: ${e.message}`)
        }
    }

    static async moveCardToPending(req) {
        req.status = STATUS_PENDING
        await CardHandler.updateCardStatus(req)
    }

    static async moveCardToInProgress(req) {
        req.status = STATUS_IN_PROGRESS
        await CardHandler.updateCardStatus(req)
    }

    static async moveCardToDone(req) {
        req.status = STATUS_DONE
        await CardHandler.updateCardStatus(req)
    }

    /**
     * 
     * @param {*} req 
     */
    static async updateCardStatus(req) {
        const updateCardstatusRequest = {
            id: req.id,
            status: req.status
        }

        try {
            const service = new CardService(cardPersistence, userPersistence);
            await service.updateCardStatus(updateCardstatusRequest)

            await DashboardHandler.showDashboard()
        } catch(e) {
            console.error(`An error has ocurred trying to update the card status: ${e.message}`)
        }
    }

}