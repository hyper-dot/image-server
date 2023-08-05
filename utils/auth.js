import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(`received:${token}`);
  console.log(`have:${process.env.IMAGE_TOKEN}`);
  if (token !== process.env.IMAGE_TOKEN) {
    return res.status(401).json({ message: 'unauthorized' });
  }
  next();
};
