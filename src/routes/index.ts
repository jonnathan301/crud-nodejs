import { Router } from 'express'
import {getPersons, getPersonByDocumentNumber, createPerson, updatePerson, deletePerson} from '../controllers/index-controller'

const router = Router();

router.get('/persons', getPersons);
router.get('/persons/:documentNumber', getPersonByDocumentNumber);
router.post('/persons', createPerson);
router.put('/persons/:documentNumber', updatePerson);
router.delete('/persons/:documentNumber', deletePerson);

export default router;