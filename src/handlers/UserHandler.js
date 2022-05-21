import UserService from "../services/UserService.js";
import UserPersistenceSql from "../repositories/sql/UserPersistenceSqlRepository.js"

const userPersistenceRepository = new UserPersistenceSql();

export default class UserHandler {

    /**
     * @param {*} req 
     */
    static async addUser(req) {
        const addUserReq = {
            name: req.name,
            email: req.email,
            pass: req.pass
        }

        try {
            const userService = new UserService(userPersistenceRepository)
            const user = await userService.addUser(addUserReq)

            delete user.pass
            delete user.updatedAt
            
            await UserHandler.listUsers()
        } catch(e) {
            console.error(`An error has ocurred trying to create the user: ${e.message}`)
        }
    }

    /**
     * 
     */
     static async listUsers() {
        try {
            const userService = new UserService(userPersistenceRepository)
            const users = await userService.listUsers()
            const presentableUsers = users.map(u => {
                delete u.pass

                return u
            })
            
            console.clear()
            console.table(presentableUsers)
        } catch(e) {
            console.error(`An error has ocurred trying to create the user: ${e.message}`)
        }
    }

    /**
     * @param {*} req 
     */
    static async changeUser(req) {
        try {
            const userService = new UserService(userPersistenceRepository)
            await userService.updateUser(req)

            await UserHandler.listUsers()
        } catch(e) {
            console.error(`An error has ocurred trying to update the user: ${e.message}`)
        }
    }
}