import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });

  if (user) {
    return res.json('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();

  res.json('User Registered Successfully');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ message: "User Doesn't Exist" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user._id }, 'secret');

  res.json({ token, userId: user._id });
});

export { router as userRouter };
