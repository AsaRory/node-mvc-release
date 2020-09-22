import fs from "fs";
import { join } from 'path'
import nodeRsa from 'node-rsa'
export class CryptHelper {
    public static generateKey(){
        const key = new nodeRsa({ b: 1024 }); // 生成新的1024位长度密钥
        key.setOptions({encryptionScheme: 'pkcs1'}); // 必须加上，加密方式问题。
        const publicDer = key.exportKey('pkcs8-public'); // 输出公钥
        const privateDer = key.exportKey('pkcs8-private'); // 输出秘钥
        const pubFile = join(__dirname,'./pub.key');
        const priFile = join(__dirname,'./pri.key');
        fs.writeFile(pubFile,publicDer,function (err) {
            if (err) {
                console.log('写入失败', err);
            } else {
                console.log('写入成功');
            }
        })
        fs.writeFile(priFile,privateDer,function (err) {
            if (err) {
                console.log('写入失败', err);
            } else {
                console.log('写入成功');
            }
        })
    }
    public static encryptByKey(plaintext: string) {
        const pubFile = join(__dirname,'./pub.key');
        const publicStr =  fs.readFileSync(pubFile);
        const a_public_key = new nodeRsa(publicStr,'pkcs8-public');
        a_public_key.setOptions({encryptionScheme: 'pkcs1'}); //  设置加密方式问题。
        const encrypted = a_public_key.encrypt(plaintext, 'base64');
        return encrypted;
    }
    public static decryptByKey(cypher: string) {
        const priFile = join(__dirname,'./pri.key');
        const priavteStr =  fs.readFileSync( priFile).toString('utf8');
        const a_private_key = new nodeRsa(priavteStr,'pkcs8-private');// 导入私钥
        a_private_key.setOptions({encryptionScheme: 'pkcs1'}); //  设置加密方式问题。
        const encrypted = a_private_key.decrypt(cypher, 'utf8');
        return encrypted;
    }
}

/**
 * require.main 可以判断是否为应用主模块。所以导入的时候就不会运行这个。
 * 只有直接使用node来使用的时候才会生成秘钥公钥
 */
if (require.main === module) {
    // CryptHelper.generateKey();
    const password =  CryptHelper.encryptByKey('123456');
    console.log('password=', password);
}

