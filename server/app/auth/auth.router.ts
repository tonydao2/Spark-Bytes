import express from 'express';
import { authToken } from '../middleware/authToken.ts';
import * as authController from './auth.controller.ts';

const router = express.Router();
router.use(authToken); // do we need this 
router.post('/signup', authController.signup); // went to the route
