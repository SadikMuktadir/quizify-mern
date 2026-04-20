import express from 'express';
import { ResultController } from './result.controller';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post('/save-result', auth('USER'), ResultController.saveResult);
router.get('/', ResultController.getAllResults);
router.get('/:resultId', ResultController.getSingleResults);

export const resultRoutes = router;
