export default class UserService {
    constructor(
    ) {}

    async createUser(body: any): Promise<any> {
        let mensaje: string = 'hola';
        return { mensaje };
    }
}