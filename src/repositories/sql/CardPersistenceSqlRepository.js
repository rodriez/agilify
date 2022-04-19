import CardModel from '../sequelize/CardModel.js'

/**
 * @typedef {import('../../services/CardService').Card} Card
 * @typedef {import('../../services/CardService').CardPersistence} CardPersistence
 * @typedef {import('../../services/DashboardService').CardSearchEngine} CardSearchEngine
 * 
 * @implements {CardPersistence}
 * @implements {CardSearchEngine}
 */
export default class CardPersistenceSqlRepository {
    /**
     * 
     * @param {import('events').EventEmitter=} eventEmitter  
     */
    constructor(eventEmitter) {
        /**@private */
        this.eventEmitter = eventEmitter
    }

    /**
     * 
     * @param {Card} card 
     */
    async add(card) {
        await CardModel.create(card)

        this.eventEmitter?.emit('card-created', card)
    }

    /**
     * 
     * @param {Card} card 
     */
    async update(card) {
        const cardId = card.id
        delete card.id

        await CardModel.update(card, {
            where: {
                id: cardId
            }
        })

        this.eventEmitter?.emit('card-updated', card)
    }

    /**
     * 
     * @param {string} id
     * @returns {Promise<Card | undefined>} 
     */
    async findById(id) {
        const row = await CardModel.findByPk(id)

        if (!row) {
            return
        }

        return row.toCard()
    }

    /**
     * @returns {Promise<Card[]>}
     */
    async all() {
        const resultSet = await CardModel.findAll()

        return resultSet.map((row) => row.toCard())
    }
}