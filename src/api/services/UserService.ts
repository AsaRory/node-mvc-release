import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
    ) { }

    public find(): Promise<User[]> {
        return this.userRepository.find();
    }

    public findOne(id: string): Promise<User | undefined> {
        return this.userRepository.findOne({ id });
    }

    public async create(user: User): Promise<User> {
        user.id = uuid.v1();
        const newUser = await this.userRepository.save(user);
        return newUser;
    }

    public update(id: string, user: User): Promise<User> {
        user.id = id;
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
        return;
    }

}
