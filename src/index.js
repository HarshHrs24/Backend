import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";

const app = express()

app.use(express.json());

app.use(cors());

app.use('/auth', userRouter)

mongoose.connect(`mongodb+srv://rohannsingh987:newsapp@cluster0.nyrk1k7.mongodb.net/?retryWrites=true&w=majority`)


const port = 1234
app.listen(port, ()=> console.log(`Server Running on ${port}`));