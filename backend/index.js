import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors";
// import { v2 as cloudinary } from "cloudinary";
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js';
import connectDB from './db/connectDB.js';
// import bodyParser from 'body-parser';

const app = express();

dotenv.config();
connectDB();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(bodyParser());
// app.use(cors({
//   // origin: 'http://localhost:5173',
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true
// }));
app.use(cors());

// // Routes
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
// app.use('/api/posts/', postRoutes);
// app.use("/api/messages", messageRoutes);

app.listen(port, () => console.log(`listening on ${port} port hey`));
