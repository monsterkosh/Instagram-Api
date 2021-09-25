import { Body, Controller, Post } from "routing-controllers";
import { IResponse, ResponseFormat } from "../Formatter/ResponseFormat";
import UserRegister from "../Models/Request/UserRegister";
import UserService from "../Services/UserService";

@Controller('users')
export class UserController {
    constructor(
        private _userService: UserService
    ) { }

    @Post()
    async createUser(@Body() body: UserRegister): Promise<IResponse> {
        let response = await this._userService.createUser(body);
        return ResponseFormat._make(response);
    }
}