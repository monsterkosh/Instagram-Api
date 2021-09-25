import HomeService from "../Services/HomeService";
import { Get, JsonController } from "routing-controllers";
import { IResponse, ResponseFormat } from "../Formatter/ResponseFormat";
import { Service } from "typedi";

@JsonController()
@Service()
export class HomeController {
    constructor(
        private _homeService: HomeService
    ) { }

    @Get('/test')
    async getAuthCode(): Promise<IResponse> {
        console.log('HOME CONTROLLER')
        let response = await this._homeService.getAuthCode();
        return ResponseFormat._make(response);
    }
}