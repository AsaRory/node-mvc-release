import { Get, JsonController, QueryParam, Body, Post, CurrentUser, Authorized } from "routing-controllers";
import { env } from '../../env'
import AjaxResponse from "../common_class/AjaxResponse";
import {CryptHelper,MD5,TokenHelper} from "../../utils"
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
            const token =  TokenHelper.createToken(findUser);
            return new AjaxResponse(1, '登录成功', token);
        }catch(e){
            console.error(e);
            return new AjaxResponse(1, '密码不正确');
        }
    }

    @Get('current-user')
    @Authorized()
    public getCurrentUser(@CurrentUser() user:User):User{
        return user;
    }

    @Post('register')
    public register(@Body() user: User):Promise<AjaxResponse>{
        user.salt = MD5.getRandomSalt();
        const decPassword =  CryptHelper.decryptByKey(user.password);
        user.password = MD5.cryptPwd(decPassword, user.salt);
        return this.userService.create(user);
    }
}