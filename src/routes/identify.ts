import { Router } from 'express';
import { addUser } from '../controllers/users';
const router = Router();

// router.route('/').get(healthcheck);

router.route('/').post(addUser)

export default router