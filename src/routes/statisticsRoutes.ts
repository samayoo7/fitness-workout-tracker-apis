import { Router } from 'express';
import { statisticsController } from '@/controllers/statisticsController';
import { authenticateUser } from '@middlewares/authMiddleware';

const router = Router();

router.get('/', authenticateUser, statisticsController.getStatsSummary);

export default router;
