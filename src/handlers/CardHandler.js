import CardService, { STATUS_DONE, STATUS_IN_PROGRESS, STATUS_PENDING } from "../services/CardService.js";
import UserPersistenceFileRepository from "../repositories/UserPersistenceFileRepository.js";
import CardPersistenceFile from "../repositories/CardPersistenceFileRepository.js";
import DashboardHandler from "./DashboardHandler.js";

const cardPersistence = new CardPersistenceFile("./data/cards.json")
const userPersistence = new UserPersistenceFileRepository("./data/users.json")

export default class CardHandler {
    
    /**
     * 
     * @param {*} req 
     */
    static addCard(req) {
        const addCardRequest = {
            title: req.title,
            userId: req.userId,
            description: req.description
        }

        try {
            const service = new CardService(cardPersistence, userPersistence);
            service.addCard(addCardRequest)

            DashboardHandler.showDashboard()
        } catch(e) {
            console.error(`An error has ocurred trying to create the card: ${e.message}`)
        }
    }

    static moveCardToPending(req) {
        req.status = STATUS_PENDING
        CardHandler.updateCardStatus(req)
    }

    static moveCardToInProgress(req) {
        req.status = STATUS_IN_PROGRESS
        CardHandler.updateCardStatus(req)
    }

    static moveCardToDone(req) {
        req.status = STATUS_DONE
        CardHandler.updateCardStatus(req)
    }

    /**
     * 
     * @param {*} req 
     */
     static updateCardStatus(req) {
        const updateCardstatusRequest = {
            id: req.id,
            status: req.status
        }

        try {
            const service = new CardService(cardPersistence, userPersistence);
            service.updateCardStatus(updateCardstatusRequest)

            DashboardHandler.showDashboard()
        } catch(e) {
            console.error(`An error has ocurred trying to update the card status: ${e.message}`)
        }
    }

}