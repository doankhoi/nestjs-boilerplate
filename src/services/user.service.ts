import { User } from '@entities';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories';

@Injectable()
export class UserService {
  public userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  findUserByWalletAddress(walletAddress: string) {
    return this.userRepository
      .getRepository()
      .findOne({ where: { walletAddress } });
  }

  findUserByEmail(email: string) {
    return this.userRepository.getRepository().findOne({ where: { email } });
  }

  signup(user: User) {
    return this.userRepository.create(user);
  }
}
