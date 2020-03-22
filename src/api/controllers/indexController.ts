import { Get, JsonController } from "routing-controllers";

@JsonController('/')
export default class UserController {
    constructor() {
    }

    @Get()
    public find() {
        console.log('hello world');
        return "hello wrold"
    }

}