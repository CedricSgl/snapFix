import express from 'express';
import * as usersController from '../controllers/user.controller';
import { check } from 'express-validator';

const router = express.Router();

router.get('/', usersController.getAll);

router.get('/:id', usersController.get);

router.post('/', [check("emailAddress", "Please include a valid email").isEmail()], usersController.create);

router.put('/:id', usersController.update);

router.delete('/:id', usersController.remove);

export default router;