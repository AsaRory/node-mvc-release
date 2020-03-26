import { Get, JsonController, Post, Body, OnUndefined, Param, Delete, Put, Authorized } from "routing-controllers";
import { UserService } from '../services/UserService';
import { User } from "../models/User";
import AjaxResponse from "../common_class/AjaxResponse";

@JsonController('/user')
@Authorized(['admin,user'])
export default class UserController {
    constructor(
        private userService: UserService
    ) {
    }

    @Get()
    public find(): Promise<AjaxResponse>  {
        return this.userService.find();
    }

    @Post()
    public create(@Body() user: User): Promise<AjaxResponse> {
        return this.userService.create(user);
    }

    @Put('/:id')
    public update(@Body() user: User,@Param('id') id: string): Promise<AjaxResponse> {
        return this.userService.update(id,user);
    }

    @Get('/:id')
    public one(@Param('id') id: string): Promise<AjaxResponse> {
        return this.userService.findOne(id);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<AjaxResponse> {
        return this.userService.delete(id);
    }

}