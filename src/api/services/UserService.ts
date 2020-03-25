import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';
import AjaxResponse from '../common_class/AjaxResponse';

@Service()
export class UserService {

    constructor(
        @OrmRepository() private userRepository: UserRepository,
    ) { }

    public async find(): Promise<AjaxResponse> {
        const list =  await this.userRepository.find();
        return new AjaxResponse(1,'获取成功',list);
    }

    public async findOne(id: string): Promise<AjaxResponse> {
        const user = await this.userRepository.findOne({ id });
        return new AjaxResponse(1,'获取成功',user);
    }

    public async findOneByUser(user:User):Promise<User|undefined> {
        const findUser = await this.userRepository.findOne(user);
        return findUser;
    }

    public async create(user: User): Promise<AjaxResponse> {
        user.id = uuid.v1();
        const newUser = await this.userRepository.save(user);
        return new AjaxResponse(1,'新增成功',user);
    }

    public async update(id: string, user: User): Promise<AjaxResponse> {
        user.id = id;
        const updateUser = await this.userRepository.save(user);
        return new AjaxResponse(1,'修改成功',updateUser);
    }

    public async delete(id: string): Promise<AjaxResponse> {
        const result =  await this.userRepository.delete(id);
        return new AjaxResponse(1,'删除成功');
    }

}
