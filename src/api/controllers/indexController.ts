import { Get, JsonController, QueryParam, Body, Post } from "routing-controllers";
import { env } from '../../env'
import AjaxResponse from "../common_class/AjaxResponse";
import {CryptHelper,MD5} from "../../utils"
import { User } from "../models/User";
import { UserService } from "../services/UserService";

@JsonController('/')
export default class UserController {
    constructor(private userService: UserService) {
    }

    @Get('login')
    public async login(@QueryParam('username') username: string, @QueryParam('password') password: string):Promise<AjaxResponse>  {
        console.log('password=',password);
        const user:User = new User();
        user.wx_name = username;
        const findUser:User|undefined = await this.userService.findOneByUser(user);
        if(!findUser){
            return new AjaxResponse(-1, '未找到用户');
        }
        try{
            const decPassword =  CryptHelper.decryptByKey(password);
            const encryptPassword = MD5.cryptPwd(decPassword, findUser.salt);
            if(encryptPassword !== findUser.password){
                return new AjaxResponse(-1, '密码错误');
            }
            return new AjaxResponse(1, '登录成功', findUser);
        }catch(e){
            console.error(e);
            return new AjaxResponse(1, '密码不正确');
        }
    }

    @Post('register')
    public register(@Body() user: User):Promise<AjaxResponse>{
        user.salt = MD5.getRandomSalt();
        const decPassword =  CryptHelper.decryptByKey(user.password);
        user.password = MD5.cryptPwd(decPassword, user.salt);
        return this.userService.create(user);
    }
}