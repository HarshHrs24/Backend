import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";

const app = express()

app.use(express.json());

app.use(cors());
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, 'secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  };
  
app.use('/auth', userRouter)

mongoose.connect(`mongodb+srv://rohannsingh987:newsapp@cluster0.nyrk1k7.mongodb.net/?retryWrites=true&w=majority`)



const port = 1234
app.listen(port, ()=> console.log(`Server Running on ${port}`));

