
import express from 'express';
import createUser, {
  getSingleUser,
  getAllUser,
  login
} from '../service/userService.js';

const userRoutes = express.Router()
userRoutes.post('/create', createUser)
userRoutes.post('/login', login)
userRoutes.post('/', getAllUser)
userRoutes.get('/:id', getSingleUser)


export default userRoutes
