import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";
const regexPassValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/;
export default class UserRegister {
    @IsNotEmpty()
    @IsEmail()
    @IsString({ message: "Email must be a string" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 20)
    @Matches(regexPassValidator, { message: "Password dont meet the requirements" })
    password: string;

    @IsNotEmpty()
    @IsNumber()
    rol: number;

    constructor()
    constructor(user?: any)
    constructor(user?: UserRegister) {
        this.email = user && user.email ? user.email : null;
        this.password = user && user.password ? user.password : null;
        this.rol = user && user.rol ? user.rol : null;
    }

}