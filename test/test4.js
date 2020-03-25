const fs = require('fs')
const crypto = require('crypto')

const publicKey = fs.readFileSync('./pub.key').toString('utf-8')
const privateKey = fs.readFileSync('./pri.key').toString('utf-8')

console.log(publicKey) //公钥
console.log(privateKey) //私钥

const data = 'ceshi'
var buffer = new Buffer(data)
var encrypted = crypto.publicEncrypt(publicKey, buffer)
console.log(encrypted);
// 得到加密的密文
let encryptedStr = encrypted.toString('base64')
// let encryptedStr = 'bGMnDkPFnE/PbL1bDDd7MoJC+iUqNhkYkBtYEEHk5i14jTi5EoqJefByDyjb5Fofrl2fu6lheBh+qPR56qoeBw=='.toString('base64');
console.log(encryptedStr)
//rkOkBtFX+xVcAMZ+wI7A0qY/HvDy8dRWvcw/+s7AYqsaGULlr12/RhrcRl7npIIb6t+L53/KkTGX56h8NwNsUsDHBVeL5kgOTWm6f5yOzaoz3ppnVGJbsLAO69I9qV26CzrwS8/PMtDMLbrJgpB/la4Nl7WDJX/GgOcmOFbNmTo=


// 解密
var buffer2 =  Buffer.from('pBUBPqwi94JZ0GXIbuIOwTTQD2tYOn9wcfOaCPiQtTs72NbE4ACTADGV3Z4/xjV33gzR1i+mLYm1B4gpYEFWYQ==', 'base64')
var decrypted = crypto.privateDecrypt(
    {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    buffer2
)
console.log( decrypted.toString('utf-8'));