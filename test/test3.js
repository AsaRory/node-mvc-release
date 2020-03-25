var NodeRSA = require('node-rsa');
const fs = require('fs');
const { join } = require('path');
var key = new NodeRSA({ b: 512 }); //生成新的512位长度密钥

// const privateKey = fs.readFileSync(join(__dirname, './pri.key'), "utf8");
// const publicKey = fs.readFileSync(join(__dirname, './pub.key'), "utf8");
const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n'+
'MIICxjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIlqYsSIeTGqoCAggA\n'+
'MBQGCCqGSIb3DQMHBAjsBOXMcqORpQSCAoADGEI2ECPkZLeygruK0biTGVq/v54w\n'+
'KOyyuvLzzlxce+lfLaxABsvbu97IyZ6QPAhltsHIgjdgyBfCW/whqgHo2/rnmQ6W\n'+
'mOZ394D5yOS1K7fFHnsl9bK6Aa8t2UULYJbIawICJEqDIwOJWc5J3WcqLYA7DRSs\n'+
'iA/fTGIv/OXSi+WE6LaCbEb0xaK/UoiqENokNC9FcsMsfxXawR1y6wzquxx/8Wf8\n'+
'pWYmtgNWdLaKQaro+4kdg7DvTG5qIZfz7PgiVHg3XvPEKHTLo1OieerzO8x2gubS\n'+
'+PfKdgt3SqX0KIw789RTYoqX+KmLGwkBYqeTysqOGtFduorrwd57LcKC6jiiQP78\n'+
'CixnCXtuMecgLn5GH9EFe2iicnYdR3wE5Ivg7argvgztUfb0fG7h11ukIurHa9OV\n'+
'in/RffwRWFfhr+cEjIgVs0JetVnw5+w/th9fdsL/Bo4QCwH5AkmUveEN9WGA44vv\n'+
'5pGMIqYnhd9jbSqmqZxBnLfOc7W9v8JwwabEOk5kVmrO+JH/jLGy2lWF5+9SN5NS\n'+
'KEZLHNIKwhluvj0cKrR6lgKmDJkR8XRb9eO8VUsUVoA36W+RUxWHPUwmaE1oFaFV\n'+
'7YW2NDbPz6S+uI5+VHIkgOBNArTNOZKbMeXGozHonqFo+lM3cNUUOOCL5kNCiRJq\n'+
'hOKFQXaRA+T3fq9WksKtydWbr0s+yB4Ay0WXV4Gezjp6dJm8m+cfUlBHYgamqamg\n'+
'uNFWElOPgl+HK69hYLiimsDjcWTeN/pAuHRz8IUiP9ySzZMFk3TBcGG3QEdmk597\n'+
'PWSQrBfCqgJtw2bf0K+8UfdXqimiWT3dsYanyW5p2jYspXKkt8VJ3yvg\n'+
'-----END RSA PRIVATE KEY-----\n'


const pub = '-----BEGIN PUBLIC KEY-----\n'+
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDXOiDIh05FOv3ggYxBcEAMKh4H\n'+
'vsgqH4Sgnegjoy4RST/0oYsbixjJkBW6WSAHe0iNxCTI0JRVewAzuV5m3OvEJuT0\n'+
'jTIDdog0B4T7li8gREtV4tt1X3dkX9p7n70FjTTHLXnFdxErdf4/mRPJQ6RxP0xa\n'+
'uqf5a6wnmMmi8qNUZQIDAQAB\n'+
'-----END PUBLIC KEY-----\n'


// console.log(pub);
// const a_public_key = new NodeRSA(pub);
// const a_private_key = new NodeRSA(privateKey);

// const text = 'Hello RSA!';

// // 加签并加密
// const sign = a_private_key.sign(text, 'base64', 'utf8');
// console.log('A 私钥加签:', sign);

// const verify = a_public_key.verify(text, decrypted, 'utf8', 'base64');
// console.log('A 公钥验签:', verify);
var publicDer = key.exportKey('public');
var privateDer = key.exportKey('private');
    console.log('公钥:',publicDer);
    console.log('私钥:',privateDer);

const a_public_key = new NodeRSA(publicDer);
const a_private_key = new NodeRSA(privateDer);

const text = 'Hello RSA!';

// 加签并加密
// const sign = a_private_key.sign(text, 'base64', 'utf8');
// console.log('A 私钥加签:', sign);

const encrypted = a_public_key.encrypt(text, 'base64');
console.log('B 公钥加密:', encrypted);

// 解密并验签
const decrypted = a_private_key.decrypt(encrypted, 'utf8');
console.log('B 私钥解密:', decrypted);

// const verify = a_public_key.verify(text, decrypted, 'utf8', 'base64');
// console.log('A 公钥验签:', verify);