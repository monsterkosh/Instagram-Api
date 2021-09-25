import { Service } from "typedi";

@Service()
export default class HomeService {
    constructor(
    ) {}

    async getAuthCode(): Promise<any> {
        console.log('HOME SERVICE')
        let response: string = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user_media,user_profile&response_type=code`
        return response;
    }

    async getTest(): Promise<any> {
        console.log('HOME SERVICE');
    }

}