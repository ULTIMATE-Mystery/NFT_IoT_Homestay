export class TokenState {
    accessToken: string;

    constructor(data?: ITokenState) {
        this.accessToken = data?.accessToken || '';
    }
}

export type ITokenState = {
    [Property in keyof TokenState]+?: TokenState[Property];
};
