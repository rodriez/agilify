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
            
            UserHandler.listUsers()
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
}