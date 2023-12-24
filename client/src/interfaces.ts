export interface IUser {
    name: string;
    username: string;
    email: string;
}

export interface IFullUser extends IUser {
    password: string;
}

export interface IAuthResult {
    message: string;
    error: boolean;
}
