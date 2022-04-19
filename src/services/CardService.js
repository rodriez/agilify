import * as uuid from 'uuid'

export const STATUS_PENDING = "Pending"
export const STATUS_IN_PROGRESS = "In Progress"
export const STATUS_DONE = "Done"

const validStatuses = [STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_DONE]

/**
 * @typedef {object} Card
 * @property {string=} id
 * @property {string=} title
 * @property {string=} userId
 * @property {string=} description
 * @property {string} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * 
 * @typedef {object} CardPersistence
 * @property {function(Card):Promise<void>} add - Register a new Card
 * @property {function(string):Promise<Card|undefined>} findById - Return a value that indicates if the user exist
 * @property {function(Card):Promise<void>} update - Update an existing Card. If the card not exist throws an error
 */
export default class CardService {

    /**
     * @param {CardPersistence} cardPersistence 
     * @param {import('./UserService').UserPersistence} userPersistence 
     */
    constructor(cardPersistence, userPersistence) {
        this.cardPersistence = cardPersistence
        this.userPersistence = userPersistence
    }

    /**
     * Add a new card to the dashboard
     * 
     * @param {object} req 
     * @param {string} req.title 
     * @param {string=} req.userId 
     * @param {string=} req.description
     * 
     * @throws {Error} Invalid card title
     * @throws {Error} Invalid card user
     */
    async addCard(req) {
        this.checkAddCardRequest(req)

        const card = {
            id: uuid.v4().split('-')[0],
            title: req.title,
            user_id: req.userId,
            status: STATUS_PENDING,
            description: req.description,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await this.cardPersistence.add(card)
    }

    /**
     * @private
     */
    checkAddCardRequest(req) {
        if (req?.title == "") {
            throw Error("Invalid card title")
        }

        if (req.userId != undefined && req.userId == "") {
            throw Error("Invalid card user")
        }
    }

    /**
     * Update an existing card in the dashboard
     * 
     * @param {object} req 
     * @param {string} req.id 
     * @param {string} req.status 
     * 
     * @throws {Error} Invalid card id
     * @throws {Error} Invalid card status
     * @throws {Error} Card not found
     */
    async updateCardStatus(req) {
        this.checkUpdateCardRequest(req)

        const card = await this.cardPersistence.findById(req.id)
        if (card == undefined) {
            throw Error("Card not found")
        }


        card.status = req.status
        card.updatedAt= new Date(),
        

        await this.cardPersistence.update(card)
    }

    /**
     * @private 
     */
    checkUpdateCardRequest(req) {
        if (req?.id == "") {
            throw Error("Invalid card id")
        }

        if (req.status != undefined && (req.status == "" || !validStatuses.includes(req.status))) {
            throw Error("Invalid card status")
        }
    }
}