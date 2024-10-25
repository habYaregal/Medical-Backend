import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

sequelize.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch(err => console.error('Unable to connect to the database:', err));
export default sequelize;
