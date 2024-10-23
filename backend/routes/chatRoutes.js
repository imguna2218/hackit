import express from 'express';
import { getChatHistory, getPrompt, saveMessage } from '../controllers/chatController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.post('/prompt', protectRoute, getPrompt);
router.post('/save', protectRoute, saveMessage);
router.get('/history', protectRoute, getChatHistory);

export default router;