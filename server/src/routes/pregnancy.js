import { Router } from 'express'
import pregancyController from '../controllers/pregnancy'

let router = Router();

// a simple test url to check that all of our files are communicating correctly.
router.get('/:id', pregancyController.get);
router.post('/save', pregancyController.save);

export default router
