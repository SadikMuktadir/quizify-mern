import express from 'express';
import { ResultController } from './result.controller';

const router = express.Router();

router.post('/save-result', ResultController.saveResult);
router.get('/', ResultController.getAllResults);
router.get('/:resultId', ResultController.getSingleResults);

export const resultRoutes = router;
