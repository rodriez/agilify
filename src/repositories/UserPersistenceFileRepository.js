import * as fs from 'fs'
import * as path from 'path'
import lodash from 'lodash'

/**
 * @typedef {import('../services/UserService').UserSearchCriteria} UserSearchCriteria
 * @typedef {import('../services/UserService').User} User
 * @typedef {import('../services/UserService').UserPersistence} UserPersistence
 * 
 * @implements {UserPersistence}
 */
export default class UserPersistenceFileRepository {

    /**
     * 
     * @param {string} filePath 
     */
    constructor(filePath) {
        /**@private */
        this.path = filePath
        
        /**@private @type User[]*/
        this.collection = []

        this.load()
    }

    /**
     * @param {User} user 
     */
    add(user) {
        this.collection.push(user)

        this.save()
    }

    /**
     * @param {UserSearchCriteria} criteria 
     * 
     * @returns {boolean}
     */
    exists(criteria) {
        return (lodash.findIndex(this.collection, criteria) >= 0)
    }
    
    /**
     * @returns {User[]}
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