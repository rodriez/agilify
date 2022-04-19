import UserModel from '../sequelize/UserModel.js';

/**
 * @typedef {import('../../services/UserService').UserSearchCriteria} UserSearchCriteria
 * @typedef {import('../../services/UserService').User} User
 * @typedef {import('../../services/UserService').UserPersistence} UserPersistence
 * 
 * @implements {UserPersistence}
 */
export default class UserPersistenceFileRepository {

    /**
     * @param {User} user 
     */
    async add(user) {
        await UserModel.create(user)
    }

    /**
     * @param {UserSearchCriteria} criteria 
     * 
     * @returns {boolean}
     */
    exists(criteria) {
        const promise = UserModel.count({
            where: {
                email: criteria.email
            }
        })

        const results = Promise.all([promise])

        return results[0] > 0
    }
    
    /**
     * @returns {Promise<User[]>}
     */
    async all() {
        const resultSet = await UserModel.findAll()

        return resultSet.map(row => row.toUser())
    }
}