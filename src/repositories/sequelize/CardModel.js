import {Model, DataTypes} from 'sequelize'

export default class CardModel extends Model {

    /**
     * @param {*} sequelize
     * @returns {*}
     */
    static init(sequelize) {
        const tableSpec = {
            id: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            status: DataTypes.STRING,
            user_id: DataTypes.STRING
        }
    
        const options = {
            sequelize: sequelize,
            modelName: "card",
            timestamps: true
        }

        
        // @ts-ignore
        super.init(tableSpec, options)
    }

    /**
     * @returns {import('../../services/CardService').Card}
     */
    toCard() {
        return {
            id: this.getDataValue("id"),
            title: this.getDataValue("title"),
            description: this.getDataValue("description"),
            status: this.getDataValue("status"),
            userId: this.getDataValue("user_id"),
            createdAt: this.getDataValue("createdAt"),
            updatedAt: this.getDataValue("updatedAt"),
        }
    }

}