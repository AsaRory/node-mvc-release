import * as jwt from 'jsonwebtoken';
import { User } from '@/api/models/User';
import { env } from "../env";
import { HttpError } from 'routing-controllers';
// 获取token配置
export class TokenHelper {
    /**
     * 生成token码
     * @param userInfo
     * @param timeout[超时时间]
     * @returns String
     */
    public static createToken(userInfo: User, timeout = 30) {
        // payload信息,先放一些默认信息
        const payload = {};
        // 合并自定义信息
        Object.assign(payload, userInfo);
        // 生成token
        const token = jwt.sign(payload, env.app.tokenSecret, { expiresIn: timeout * 60 }).toString();
        return token;
    }
    /**
     *  解析token
     * @param token
     * @returns {*}
     */
    public static decodeToken(token='') {
        // 解析token
        const payload = jwt.verify(token, env.app.tokenSecret, (error: any, decoded: any) => {
            if (error) {
                console.log('解析token', error.message)
                throw new HttpError(401, '您还没有登录。暂无此请求权限')
            }
            return decoded
        })
        return payload;
    }
}