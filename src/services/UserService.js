import * as uuid from 'uuid'

/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string=} pass
 * @property {Date=} createdAt
 * @property {Date=} updatedAt
 * 
 * @typedef {object} UserSearchCriteria
 * @property {string=} id
 * @property {string=} email
 * 
 * @typedef {object} UserPersistence
 * @property {function(User):void} add - Register a new user
 * @property {function(UserSearchCriteria):Boolean} exists - Search and return a value that indicate if the user exists
 * @property {function():Promise<User[]>} all - Return all the users in the db
 */
export default class UserService {

    /**
     * @param {UserPersistence} userPersistence
     */
    constructor(userPersistence) {
        /**@private */
        this.userPersistence = userPersistence
    }

    /**
     * This function register new user
     * 
     * @param {object} req 
     * @param {string} req.name  
     * @param {string} req.email  
     * @param {string} req.pass
     * 
     * @throws {Error} Invalid user name
     * @throws {Error} Invalid user email
     * @throws {Error} Invalid user pass
     * 
     * @returns {Promise<User>}
     */
    async addUser(req) {
        this.checkAddUserRequest(req)

        const user = {
            id: uuid.v4(),
            name: req.name,
            email: req.email,
            pass: req.pass,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        if (this.userPersistence.exists({email:user.email})) {
            throw Error("Invalid user email")
        }

        await this.userPersistence.add(user)

        return user
    }

    /**
     * @private 
     */
     checkAddUserRequest(req) {
        if (req?.name == "") {
            throw Error("Invalid user name")
        }

        if (req?.email == "") {
            throw Error("Invalid user email")
        }

        if (req?.pass == "") {
            throw Error("Invalid user pass")
        }
    }

    /**
     * Get all registered users
     * 
     * @returns {Promise<User[]>}
     */
    async listUsers() {
        return await this.userPersistence.all()
    }
}