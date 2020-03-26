import { Action, HttpError } from 'routing-controllers';
import { TokenHelper } from '../../utils'

export function authorizationChecker(action: Action, roles: string[]): boolean {
    // 添加token验证
    const { request, response, next, context } = action;
    const { authorization } = request.headers;
    try{
        const [bearer, token] = authorization.split(' ');
        const user = TokenHelper.decodeToken(token);
        return true;
    }catch(e){
        throw new HttpError(401,'token不正确，解析失败');
    }
    return false
}