import express from 'express'
import connectDb from "./config/db.js"
import UrlRoutes from './routes/urlRoute.js'
import dotenv from 'dotenv'
dotenv.config()

const app=express();
connectDb();
const PORT=3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/url',UrlRoutes);

app.listen(PORT ,()=>{
    console.log("server is running on port 3000");
})
