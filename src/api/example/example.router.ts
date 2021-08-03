import express from 'express';
import { createExampleDocument, checkOwnership, getByName } from './example.controller';

const exampleRouter = express.Router();

exampleRouter.get('/', (req, res) => res.send('Hello from Example Router!'));
exampleRouter.get('/checkOwner', checkOwnership);
exampleRouter.get('/getByName', getByName);
exampleRouter.post('/create', createExampleDocument);

export default exampleRouter;
