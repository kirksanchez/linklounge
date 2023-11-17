import express from 'express';
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, createPost);

//READ
router.get('/', verifyToken, getFeedPosts);
router.get('/user/:userId', verifyToken, getUserPosts);

//UPDATE
router.patch('/:id/like', verifyToken, likePost);

export default router;
