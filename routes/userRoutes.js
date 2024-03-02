import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/login', UserController.login);

router.get('/login', UserController.getLoginForm );

router.get('/logout', UserController.logout );

export default router;
