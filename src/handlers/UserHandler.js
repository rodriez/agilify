import UserService from "../services/UserService.js";
import UserPersistenceFile from "../repositories/UserPersistenceFileRepository.js"

const userPersistenceRepository = new UserPersistenceFile("./data/users.json");

export default class UserHandler {

    /**
     * @param {*} req 
     */
    static addUser(req) {
        const addUserReq = {
            name: req.name,
            email: req.email,
            pass: req.pass
        }

        try {
            const userService = new UserService(userPersistenceRepository)
            const user = userService.addUser(addUserReq)

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
     static listUsers() {
        try {
            const userService = new UserService(userPersistenceRepository)
            const users = userService.listUsers().map(u => {
                delete u.pass

                return u
            })
            
            console.clear()
            console.table(users)
        } catch(e) {
            console.error(`An error has ocurred trying to create the user: ${e.message}`)
        }
    }
}