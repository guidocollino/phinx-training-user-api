import { Router, Request, Response } from 'express';
import { createJwtToken, createJwtPayload } from '@utils/jwt';
import { generatePasswordEncrypted, comparePasswordEncrypted } from '@utils/encode';
import { UserRepo } from '@db/repository/user.repo';
import { User } from '@db/entity/user.entity';
import { body, validationResult, ValidationError, ValidationChain } from 'express-validator';

const _registerValidations = (): ValidationChain[] => {
  console.log('VALIDATIONS REGISTER....');
  return [body('email').isEmail(), body('password').isLength({ min: 5 })];
};

const userRepo = new UserRepo();
const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await userRepo.getUserByEmail(email);
    const checkCredentials = user ? comparePasswordEncrypted(password, user.password) : false;

    if (!checkCredentials) {
      res.status(403).send({ message: 'wrong username or password' });
    }

    const jwtPayload = createJwtPayload(email);
    console.log('PAYLOAD', jwtPayload);
    const jwtToken = createJwtToken(jwtPayload);

    console.log('TOKEN-------', jwtToken);

    res.json({ token: jwtToken });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post(
  '/register',
  [body('email').isEmail(), body('password').isLength({ min: 5 })],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const passwordEncrypted = generatePasswordEncrypted(req.body.password);
      req.body.password = passwordEncrypted;

      const newUser = await userRepo.createUser(req.body);
      return res.send(newUser);
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  }
);

export default router;
