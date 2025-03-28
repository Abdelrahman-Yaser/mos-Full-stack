import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import mongoose from 'mongoose';
import cors from 'cors';
import { Credentials } from './config/corsOptions.js';
import cookieParser from 'cookie-parser';
import { rootRouter } from './routes/root.js';
dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors(Credentials));
app.use(cookieParser());
app.use(express.json());

app.use('/',rootRouter)
app.use('/auth',)


mongoose.connection.once('open', () => {
    console.log('MongoDB connection established');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
);

mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error: ', err);
}
);

connectDB();





