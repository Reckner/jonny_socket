interface IUserSocket {
    socket_id: string;
    identifier: string;
}

export default class UserSocket implements IUserSocket {
    socket_id: string;
    identifier: string;

    constructor({ socket_id, identifier }: IUserSocket) {
        this.socket_id = socket_id;
        this.identifier = identifier;
    }
}
