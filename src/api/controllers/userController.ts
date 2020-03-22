import { Get, JsonController } from "routing-controllers";
import { UserService } from '../services/UserService';
import { User } from "../models/User";

@JsonController('/user')
export default class UserController {
    constructor(
        private userService: UserService
    ) {
    }

    @Get()
    public find(): Promise<User[]>  {
        return this.userService.find();
    }

}