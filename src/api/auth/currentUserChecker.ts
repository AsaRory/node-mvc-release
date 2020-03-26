import { Action, HttpError } from 'routing-controllers';
import { TokenHelper } from '../../utils'
export async function currentUserChecker(action: Action, value?: any){
    const { request, response, next, context } = action;
    const { authorization } = request.headers;
    const [bearer, token] = authorization.split(' ');
    const user = TokenHelper.decodeToken(token);
    return user;
}