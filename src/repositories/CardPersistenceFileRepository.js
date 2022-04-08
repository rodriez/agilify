import * as fs from 'fs'
import * as path from 'path'
import lodash from 'lodash'

/**
 * @typedef {import('../services/CardService').Card} Card
 * @typedef {import('../services/CardService').CardPersistence} CardPersistence
 * 
 * @implements {CardPersistence}
 */
export default class CardPersistenceFile {

    /**
     * 
     * @param {string} filePath 
     */
    constructor(filePath) {
        /**@private */
        this.path = filePath

        /**@private @type Card[]*/
        this.collection = []

        this.load()
    }

    /**
     * 
     * @param {Card} card 
     */
    add(card) {
        this.collection.push(card)

        this.save()
    }

    /**
     * 
     * @param {string} id 
     * 
     * @returns {Card|undefined}
     */
    findById(id) {
        const idx = lodash.findIndex(this.collection, { id: id })

        if (idx >= 0) {
            return this.collection[idx]
        }
    }

    /**
     * 
     * @param {Card} card 
     */
    update(card) {
        lodash.remove(this.collection, {id: card.id})
        
        this.add(card)
    }

    /**
     * 
     * @returns {Card[]}
     */
     all() {
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