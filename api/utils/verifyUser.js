import jwt from 'jsonwebtoken'
// import { errorHandler } from './errorHandler'/

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_Token;
    // console.log(req.cookies);
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    if (!decoded) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    
    req.user = decoded;
    next();
}