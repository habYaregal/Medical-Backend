import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export const verifyToken = async (req, res, next) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.accessToken;

    if (!token) {
        return res.status(401).send({ error: 'Cannot verify, token missing' });
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;  
        
        next();
    } catch (err) {
        return res.status(403).send({ error: 'Invalid token' });
    }
};


export const checkSuperAdminRole = (req, res, next) => {
    if (req.user.role === 'SuperAdmin') {
        next();  
    }
    else{
        res.status(403).send({ error: 'Access denied' });
    }
}



export const checkAdminRole = (req, res, next) => {
    if (req.user.role === 'Admin' || req.user.role === 'SuperAdmin') {
       next(); 
    }
    else{
        res.status(403).send({ error: 'Access denied' });
    }
};


