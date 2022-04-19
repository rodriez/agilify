import {Model, DataTypes} from 'sequelize'

export default class UserModel extends Model {

    /**
     * 
     * @param {*} sequelize 
     * @returns {*} 
     */
    static init(sequelize) {
        const tableSpec = {
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            pass: DataTypes.STRING
        }
    
        const options = {
            sequelize: sequelize,
            modelName: "user",
            timestamps: (sql, timing) => {
                console.log(`${timing} - ${sql}`)
            }
        }
        
        // @ts-ignore
        super.init(tableSpec, options)
    }

    /**
     * @returns {import('../../services/UserService').User}
     */
    toUser() {
        return {
            id: this.getDataValue("id"),
            name: this.getDataValue("name"),
            email: this.getDataValue("email"),
            pass: this.getDataValue("pass"),
            createdAt: this.getDataValue("createdAt"),
            updatedAt: this.getDataValue("updatedAt"),
        }
    }
}