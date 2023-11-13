import { DataTypes, Model } from 'sequelize'
import connectToDB from './db.js'
import util from 'util'

const db = await connectToDB('postgresql:///remind-me')

class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}
User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        modelName: 'user',
        sequelize: db
    }
)

    
class Reminder extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}
Reminder.init(
    {
        reminderId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        deliverTo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deliveryDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        modelName: 'reminder',
        sequelize: db
    }
)


class Category extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}
Category.init(
    {
        categoryId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        modelName: 'category',
        sequelize: db
    }
)

User.hasMany(Reminder, { foreignKey: 'userId' })
Reminder.belongsTo(User, { foreignKey: 'userId' })

Category.hasMany(Reminder, { foreignKey: 'categoryId' })
Reminder.belongsTo(Category, { foreignKey: 'categoryId' })

export { db, User, Reminder, Category }