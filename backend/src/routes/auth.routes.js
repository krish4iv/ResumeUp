const { Router } = require('express');
const authRouter = Router();
const authController = require('../controllers/auth.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

authRouter.post('/register',authController.registerUserController);
authRouter.post('/login', authController.loginUserController);
authRouter.post('/logout',authController.logoutUserController);
authRouter.get('/get-me', AuthMiddleware.authUser, authController.getMeController);

module.exports = authRouter;