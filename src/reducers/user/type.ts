export class UserState {
    username: string;
    email: string;
    firstName: string;
    lastName: string;

    constructor(data?: IUserState) {
        this.username = data?.username || '';
        this.email = data?.email || '';
        this.firstName = data?.firstName || '';
        this.lastName = data?.lastName || '';
    }
}

export type IUserState = {
    [Property in keyof UserState]+?: UserState[Property];
};
