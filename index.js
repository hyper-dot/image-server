import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import {
  showAllProject,
  createProject,
  deleteProject,
  getOneProject,
  editProject,
} from './controllers/project.js';
import {
  addVisitor,
  getVisitiors,
  getVisitorsDetailed,
} from './controllers/Visitor.js';
import { authMiddleware } from './utils/auth.js';
import connect from './utils/db.js';
import { upload } from './utils/cloudinary.js';

// Mongodb Connection
connect(process.env.MONGO);

// Middlewares
app.set('trust proxy', true);
app.use(express.json());
app.use(cors());

app.post('/ip', addVisitor);
app.get('/ip', getVisitiors);
app.get('/ipdetailed', getVisitorsDetailed);

// Project Post
app.post(
  '/api/projects',
  authMiddleware,
  upload.single('image'),
  createProject,
);

// Get all Projects
app.get('/api/projects', showAllProject);
app.delete('/api/projects/:id', authMiddleware, deleteProject);
// Get Project By ID
app.get('/api/projects/:id', getOneProject);

app.put('/api/projects/:id', authMiddleware, editProject);

// All routes that doesn't exists
app.get('*', async (req, res) => {
  return res.status(404).json({ message: 'Not Found!' });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening to ${process.env.PORT}`);
});
