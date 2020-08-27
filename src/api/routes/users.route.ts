import { Router, Request, Response } from 'express';
import { UserRepo } from '@db/repository/user.repo';
const router = Router();

const userRepo = new UserRepo();

router.get('/', async (req: Request, res: Response) => {
  const users = await userRepo.getUsers();
  res.send(users);
});

router.get('/:id', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = await userRepo.getUser(userId);

  if (!user) {
    res.status(404).send({ message: 'User not found' });
  }
  res.json(user);
});

router.post('/', async (req: Request, res: Response) => {
  const userParams = req.body;
  const user = await userRepo.createUser(userParams);
  res.send(user);
});

export default router;
