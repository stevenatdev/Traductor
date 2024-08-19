import { Router } from 'express';
import ControllerUsers from '../controllers/Users';

const router = Router();

router.post('/', ControllerUsers.newUser);

export default router