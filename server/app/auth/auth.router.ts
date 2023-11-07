// Look at the other router files and figure out how to implement the auth router
// Until you do, you will not be able to login or register or even make requests to those routes
import express from 'express';
//import { authToken } from '../middleware/authToken.ts';
import * as authController from './auth.controller.ts';

const router = express.Router();
//router.use(authToken); // do we need this 
router.post('/signup', authController.signup); // went to the route
router.post('/login', authController.login);

export default router;

