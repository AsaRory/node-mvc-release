import crypto from 'crypto';

export class MD5 {
    // 随机盐值
    public static getRandomSalt():string {
        return Math.random().toString().slice(2, 6);
    }
    // md5加密数据
    public static  cryptPwd(password:string, salt:string) {
        // 密码加盐
        let saltPassword = `${password}:${salt}`;
        // 加盐密码的md5值
        let md5 = crypto.createHash('md5');
        let result = md5.update(saltPassword).digest('hex');
        return result;
    }
}