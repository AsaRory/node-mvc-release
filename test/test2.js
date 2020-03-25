const crypto = require('crypto');
const fs = require('fs');
const {join} = require('path');
class CryptHelper {
    privateKey;
    publickey;
    constructor() {
        // this.privateKey = '-----BEGIN ENCRYPTED PRIVATE KEY-----'+
        // '\nMIICxjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIoz9k7IjotNECAggA'+
        // '\nMBQGCCqGSIb3DQMHBAjqWTlnW66iEQSCAoAMGMo6s41ShH/BFf95OulDEld6xxXQ'+
        // '\n4NXjDQiGgeHCz1y88t9PTQcR6BSI7FOsev5Xb1kJCsG+2J7uSXdg7pzjHopb9Xde'+
        // '\nuvczvAsxzcekdhRKdCyurxLNtoQKgfV1kwPKy/hal43JptTzwnSUs2SFdUkq0PlV'+
        // '\ndlyjEkG38FYPr9ISAWXS8aHjTCCGx26pfqLc6I8I9IZPrAYcw3nk8K3/JFgOXmWu'+
        // '\nz89Iox7UP5YOa/YMwlOTCGZgtO7XABsBdd52ZkoxTtlzivt4MFEJXh4dV2XsWcw8'+
        // '\n2scH/Zds/snH+u857YfK7gKnEthWIGWA6fAvdF+44X3MCREFw/fjMzwF+UA6MPf8'+
        // '\nm0xvCQSgh4+zDicytpP1aQPhzFZlUQ4NEMv2xmgxlHwLFUJgnbjRokRLdLeH5NmD'+
        // '\nFsLxc86b3FtCFdhtlHy/Pesa7Rqy7Aodazn0Ap39NjSk17AgxDqP3zmCqAWXW3go'+
        // '\nuV9H4rCdxnnNqT+VmxRnXN+7ypH/hjQjpkzX3uCufuTwc7JNtw/EETyH/WCsRh50'+
        // '\nvStaOC2mczFSt+FCqoGacSaqoi+HoyRm1zwIAEMaH/PTS3bEG6Gmt+TMGw1RQOe9'+
        // '\nvdMKjmtGvtsw0kueqe1peBQo5tB2lHGCsIHwIyXZYGdDYKmZis4BhI8YxcJTvlD7'+
        // '\nq3JiGC4z1sAXNkU5FUxosx1Wg6wbpWPnD8EYTy1E17Jjdc4UfmzSSqMAVh7KSwFO'+
        // '\nYAswPb4HdX/myL13/+1jvWTFjl31FN6XOWB1WEyeiW4/WIrt8sDJuGL6Abg+/o+i'+
        // '\ngJ4MArbg57pu9BwdJ1YXuyMNc+4H8POXPqUS98yan75nnpAxBeti5IQa'+
        // '\n-----END ENCRYPTED PRIVATE KEY-----\n';
        // this.publickey = '-----BEGIN PUBLIC KEY-----'+
        // '\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDSgpP/4/6AJz91wYY/gsiEVQN'+
        // '\nBohEVsr97J5kLXU/njqPB00hOYWg0DOM8k1YgfdVsYGYfmPY84XkkDQO0RpCyXMc'+
        // '\nhObPTxf0KFW5DVe37iqf3JSdCSLNaoheNTTb7Oz9/pfBmdQ9rCebsVXRFHTuj4F9'+
        // '\nHzeewu9fLgHxKrmZjQIDAQAB'+
        // '\n-----END PUBLIC KEY-----\n';
        this.privateKey = fs.readFileSync(join(__dirname, './pri.key'), "utf8").toString();
        this.publicKey = fs.readFileSync(join(__dirname, './pub.key'), "utf8").toString();
        console.log(' this.privateKey=', this.publicKey);
    }
    EncryptByKey(str) {
        return crypto.publicEncrypt({ key: this.publickey, padding: crypto.constants.RSA_PKCS1_PADDING }, new Buffer(str)).toString("base64");
    }
    DecryptByKey(str) {
        return crypto.privateDecrypt({ key: this.privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, new Buffer(str, "base64")).toString();
    }
    DecryptByPublicKey(str) {
        return crypto.publicDecrypt({ key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
            new Buffer(str, "base64")).toString();
    }
}

const encrypt = new CryptHelper();
const mima = encrypt.EncryptByKey('hello');
console.log(mima);
const jiexi =  encrypt.DecryptByKey(mima);
console.log(jiexi);
