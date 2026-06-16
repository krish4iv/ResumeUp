const jwt = require('jsonwebtoken');
const authRouter = require('../routes/auth.routes');
const tokenBlackListModel = require('../models/blacklist.model');

async function authUser(req, res, next){
    
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({
            message:"Token not Provided"
        })
    }

    const isTokenBlacklisted = await tokenBlackListModel.findOne({token});

    if(isTokenBlacklisted){
        return res.status(401).json({
            message: "token is invalid"
        })
    }

    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();

    }catch(e){
        return res.status(401).json({
            message:"invalid token"
        });
    }
    
}

module.exports = {
    authUser
}