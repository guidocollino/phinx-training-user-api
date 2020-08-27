import { getRepository } from 'typeorm';
import { User } from '@db/entity/user.entity';

export class UserRepo {
  createUser(userParams: any): Promise<User[]> {
    const user = getRepository(User).create(userParams);
    return getRepository(User).save(user);
  }

  getUsers(): Promise<User[]> {
    return getRepository(User)
      .createQueryBuilder('User')
      .select(['User.id', 'User.name', 'User.email'])
      .getMany();
  }

  getUser(userId: number): Promise<User | undefined> {
    return getRepository(User).findOne(userId);
  }

  getUserByEmail(userEmail: string): Promise<User | undefined> {
    return getRepository(User).findOne({ email: userEmail });
  }
}
