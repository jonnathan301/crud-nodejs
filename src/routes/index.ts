import { Router } from 'express'
import {getPersons} from '../controllers/index-controller'

const router = Router();

router.get('/persons', getPersons);
/*
router.get('/persons/:id', getPersons);
router.post('/persons', getPersons);
router.put('/persons/:id', getPersons);
router.delete('/persons/:id', getPersons);
*/

export default router;