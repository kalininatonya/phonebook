import {User} from '../../models/user';

export interface AuthAPI {
    accessToken: string,
    user: User
}
