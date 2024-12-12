import { Router, Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/auth.controller';
import { check, validationResult } from 'express-validator';

const router = Router();

router.post('/register', [
  check('emailAddress').isEmail(),
  check('password').isLength({ min: 6 })
], (req: Request, res: Response, next: NextFunction) => {  // <--- Typage ici
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, register);

router.post('/login', [
  check('emailAddress').isEmail(),
  check('password').notEmpty()
], (req: Request, res: Response, next: NextFunction) => {  // <--- Typage ici
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, login);

export default router;
