import express from 'express';
import ChickenRoutes from './routes/ChickenRoutes.js';
import {DataBaseConnection} from './configs/DataBaseConncetion.js';
import Cors from 'cors';
import BodyParser from 'body-parser';
import Morgan from 'morgan';
import mongoose from 'mongoose';

const app = express();

DataBaseConnection();

app.use(Cors({ origin: '*' }));
app.use(Morgan('dev'));
mongoose.set("strictQuery", false);

app.use(BodyParser.json());
app.use("/api/chicken", ChickenRoutes);

export default app;