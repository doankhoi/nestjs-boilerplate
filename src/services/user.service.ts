import { SignupDto } from '@dtos';
import { User } from '@entities';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@repositories';

@Injectable()
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  findUserByWalletAddress(walletAddress: string) {
    return this.userRepository
      .getRepository()
      .findOne({ where: { walletAddress } });
  }

  signup(data: SignupDto) {
    return this.userRepository.create(new User({ ...data }));
  }
}
