import User from '../Models/userModel.js';
import bcrypt from 'bcryptjs';
import { encrypt } from '../helper/encryption.js';
import express from 'express';
import { Sequelize } from 'sequelize';


export const rigsterUser = async(req, res) => {
    const {email, password, role} = req.body;
    try{
        const isExist = await User.findOne({where: {email: email}});
        if(isExist){
            res.status(401).send({error: 'user already exist'});
        }

        const hashedPassword = encrypt(password);

        const user = await User.create({
            email: email,
            password: hashedPassword,
            role: role
        })
        res.status(200).send({message: 'user rigstered successfully'});

    }

    catch(error){
        console.error('unable to rigster the user', error);
        res.status(500).send({error: 'can not rigster'})
    }

}

export const deleteUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.user.email)
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        user.isdeleted = true;
        await user.save();

        return res.status(200).send({ message: 'User marked as deleted successfully' });

    } catch (error) {
        console.error('Unable to delete the user:', error);
        return res.status(500).send({ error: 'Unable to delete the user' });
    }
};




// Change password logic
export const changePassword = async (req, res) => {
    const { email } = req.user;  
    const { currentPassword, newPassword, confirmNewPassword } = req.body;  
    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            return res.status(400).json({ error: 'New password cannot be the same as the current password' });
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ error: 'New password and confirm password do not match' });
        }

        const hashedPassword = encrypt(password);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ error: 'Unable to change password' });
    }
};



export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            where: {
                isdeleted: false 
            },
            attributes: ['email', 'role']       
        });
        res.json(users);
    } catch (error) {
        console.error('Users cannot be retrieved:', error);
        return res.status(500).json({ error: 'Unable to retrieve users' });
    }
};




