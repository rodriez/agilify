import * as fs from 'fs'
import * as path from 'path'
import lodash from 'lodash'

/**
 * @typedef {import('../../services/CardService').Card} Card
 * @typedef {import('../../services/CardService').CardPersistence} CardPersistence
 * @typedef {import('../../services/DashboardService').CardSearchEngine} CardSearchEngine
 * 
 * @implements {CardPersistence}
 * @implements {CardSearchEngine}
 */
export default class CardPersistenceFile {

    /**
     * 
     * @param {string} filePath
     * @param {import('events').EventEmitter=} eventEmitter 
     */
    constructor(filePath, eventEmitter) {
        /**@private */
        this.path = filePath

        /**@private @type Card[]*/
        this.collection = []

        /**@private */
        this.eventEmitter = eventEmitter

        this.load()
    }

    /**
     * 
     * @param {Card} card 
     */
    async add(card) {
        this.collection.push(card)

        this.save()
        this.eventEmitter?.emit('card-created', card)
    }

    /**
     * 
     * @param {string} id 
     * 
     * @returns {Promise<Card|undefined>}
     */
    async findById(id) {
        const idx = lodash.findIndex(this.collection, { id: id })

        if (idx >= 0) {
            return this.collection[idx]
        }
    }

    /**
     * 
     * @param {Card} card 
     */
    async update(card) {
        lodash.remove(this.collection, {id: card.id})
        
        this.add(card)
        this.eventEmitter?.emit('card-updated', card)
    }

    /**
     * 
     * @returns {Promise<Card[]>}
     */
    async all() {
        this.load()
        
        return this.collection
    }

    /**
     * @private
     */
    load() {
        if (fs.existsSync(this.path)) {
            const content = fs.readFileSync(this.path)
            this.collection = JSON.parse(content.toString())
        }
    }

    /**
     * @private
     */
    save() {
        const folder = path.dirname(this.path)

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder)
        }

        fs.writeFileSync(this.path, JSON.stringify(this.collection))
    }
}