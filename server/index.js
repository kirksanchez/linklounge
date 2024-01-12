// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import multer from 'multer';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import authRoutes from './routes/auth.js';
// import userRoutes from './routes/users.js';
// import postRoutes from './routes/posts.js';
// import { register } from './controllers/auth.js';
// import { createPost } from './controllers/posts.js';
// import { verifyToken } from './middleware/auth.js';
// import User from './models/User.js';
// import Post from './models/Post.js';
// import { users, posts } from './data/index.js';

// // CONFIGURATIONS

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const corsOptions = {
//   origin: 'http://localhost:5174/', // Replace with your client's domain
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true,
//   optionsSuccessStatus: 204,
//   maxAge: 86400, // 24 hours
// };
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// app.use(morgan('common'));
// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// app.use(cors(corsOptions));
// app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// //FILE STORAGE

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/assets');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// //ROUTES WITH FILES
// app.post('/auth/register', upload.single('picture'), register);
// app.post('/posts', verifyToken, upload.single('picture'), createPost);
// app.post(
//   '/posts',
//   verifyToken,
//   upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'video', maxCount: 1 },
//     { name: 'attachment', maxCount: 1 },
//     { name: 'audio', maxCount: 1 },
//   ]),
//   createPost
// );

// //ROUTES

// app.use('/auth', authRoutes);
// app.use('/users', userRoutes);
// app.use('/posts', postRoutes);

// // MONGOOSE SETUP

// const PORT = process.env.PORT || 6001;
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));

//     /*RUN 1 TIME ONLY THEN COMMENT IT OUT*/
//     // User.insertMany(users);
//     // Post.insertMany(posts);
//   })
//   .catch((error) => console.log('Error connecting to MongoDB:', error));

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';
import { users, posts } from './data/index.js';

// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use();
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//FILE STORAGE

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//ROUTES WITH FILES
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);
app.post(
  '/posts',
  verifyToken,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'attachment', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
  ]),
  createPost
);

//ROUTES

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));

    /*RUN 1 TIME ONLY THEN COMMENT IT OUT*/
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log('Error connecting to MongoDB:', error));
