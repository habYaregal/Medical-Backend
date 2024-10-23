import express from 'express';
import sequelize from './DbConfigs/DbConfig.js';
import Patient from './Models/pataintModel.js';
import User from './Models/userModel.js'
import cors from 'cors';
import pataintroute from './Routes/pataintRoute.js';
import authroute from './Routes/authRoute.js';
import userroute from './Routes/userRoute.js'

const app = express();
app.use(express.json());
app.use('/pataints', pataintroute);
app.use('/auth', authroute);
app.use('/users', userroute);
app.use(cors())

// Setup the association
User.hasMany(Patient, {foreignKey: 'email'});
Patient.belongsTo(User, {foreignKey: 'email'});

const port = process.env.PORT;
sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`the server is running on the port ${port}`);
    })
}).catch((error)=>{
    console.error('the server is not running', error);
})