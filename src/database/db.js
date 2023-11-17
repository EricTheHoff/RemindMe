import { Sequelize } from 'sequelize'


const connectToDB = async (dbURI) => {
  console.log(`Connecting to DB at: ${dbURI}`)

  const sequelize = new Sequelize(dbURI, {
    logging: false,
    define: {
      underscored: true,
      timestamps: false
    },
    dialect: 'postgres'
    }
  )

  try {
    await sequelize.authenticate()
    console.log(`Connected to DB successfully!`)
  } catch (error) {
    console.error(`Unable to connect to DB: ${error}`)
  }

  return sequelize
}


export default connectToDB