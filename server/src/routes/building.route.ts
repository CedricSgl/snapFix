import express from 'express';
import * as buildingsController from '../controllers/building.controller';
import { check } from 'express-validator';

const router = express.Router();

router.get('/', buildingsController.getAll);

router.get('/:id', buildingsController.get);

router.post('/'/* , [check("emailAddress", "Please include a valid email").isEmail()] */, buildingsController.create);

//router.put('/:id', buildingsController.update);

//router.delete('/:id', buildingsController.remove);

export default router;