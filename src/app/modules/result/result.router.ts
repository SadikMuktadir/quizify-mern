import express from 'express';
import { ResultController } from './result.controller';
import auth from '../../../middleware/auth';

const router = express.Router();

router.post('/save-result', auth('USER'), ResultController.saveResult);
router.get('/my-results', ResultController.getMyResults);

export const resultRoutes = router;
