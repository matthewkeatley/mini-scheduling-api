import express from 'express';
import Users from '../api/controllers/users';
// import Shifts from '..controllers/shifts';

const router = express.Router();

router.get('/api/v1/users', Users.getAll);
router.get('/api/v1/users/:id', Users.getById);
router.post('/api/v1/users', Users.post);
router.put('/api/v1/users/:id', Users.put);

export default router;