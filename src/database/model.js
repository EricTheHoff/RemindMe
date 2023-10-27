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
        jobId: {
            type: DataTypes.INTEGER
        },
        reminderTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reminderBody: {
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
        categoryName: {
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

User.hasMany(Category, { foreignKey: 'userId' })
Category.belongsTo(User, { foreignKey: 'userId' })

Reminder.hasMany(Category, { foreignKey: 'reminderId' })
Category.belongsTo(Reminder, { foreignKey: 'reminderId' })

export { db, User, Reminder, Category }