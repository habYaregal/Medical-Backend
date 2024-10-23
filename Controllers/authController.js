import User from "../Models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Sequelize } from "sequelize";


// User login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const loggedInUsers = await User.findAll({
            where: {
                sessionToken: {
                    [Sequelize.Op.ne]: null  
                }
            }
        });

        if (loggedInUsers.length > 0) {
            return res.status(400).json({ error: 'Another user is already logged in. Please wait until they log out.' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Incorrect email or password' });
        }

        const accessToken = jwt.sign({ email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
        const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        user.sessionToken = accessToken;
        await user.save();

        res.cookie("accessToken", accessToken, { httpOnly: true });
        res.cookie("refreshToken", refreshToken, { httpOnly: true });

        return res.json({ message: "Login successful", accessToken, refreshToken });

    } catch (error) {
        console.error('Unable to login:', error);
        return res.status(500).json({ error: 'Cannot login' });
    }
};

//to refresh the access token when the access token is expired
export const refreshToken = async(req, res) => {
    const refreshToken=req.headers.cookie;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        
        if(err){
            res.status(401).json({error: 'invalid token'});
        }

        const accessToken = jwt.sign({email: user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
            res.cookie("accessToken",accessToken,{httpOnly:true})
            res.json({message:"Token refreshed",accessToken:accessToken});
    })
}

export const logout = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.user.email } });

        if (user) {
            user.sessionToken = null;
            await user.save();
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.json({ message: "Logout successful" });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ error: 'Cannot logout' });
    }
};