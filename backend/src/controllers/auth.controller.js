const User = require('../models/user.model');
const tokenBlackListModel = require('../models/blacklist.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

async function registerUserController(req, res) {

    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const isUserExists = await User.findOne({$or : [{username}, {email}]});
    if(isUserExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hash });
    await user.save();

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token);

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function loginUserController(req, res) {

    const { email, username, password } = req.body;

    if(!password || (!email && !username)) {
        return res.status(400).json({ message: 'Email or username and password are required' });
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });

    if(!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token);

    res.status(200).json({
        message: 'Logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function logoutUserController(req, res){
    const token = req.cookies.token;
   
    if(token){
        await tokenBlackListModel.create({token});
    }
    res.clearCookie("token");
    res.status(200).json({
        message:"user logout successfully"
    });
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
};