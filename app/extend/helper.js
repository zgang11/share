const crypto = require("crypto");
const dayjs = require('dayjs');

module.exports = {
  checkSignature(signature, timestamp, nonce) {
    const token = this.app.config.wxConfig.token;
    const tmpArr = [token, timestamp, nonce];
    tmpArr.sort();
    const tmpStr = tmpArr.join("");
    const sha1 = crypto.createHash("sha1");
    return sha1.update(tmpStr).digest("hex") === signature;
  },
  //生成随机值作为场景值
  generateRandomString() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    const randomLength = Math.floor(Math.random() * 4) + 5; // 生成一个5到8之间的随机整数
    let result = "";
    for (let i = 0; i < randomLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  timestamp() {
    return new Date().getTime();
  },
  time() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },
  unPick(source, arr) {
    if (Array.isArray(arr)) {
      const obj = {};
      for (const i in source) {
        if (!arr.includes(i)) {
          obj[i] = source[i];
        }
      }
      return obj;
    }
  },
  messageXML({url, code, touser, fromuser, msgId}) {
    const textXMl = `<xml>  
                  <ToUserName><![CDATA[${touser}]]></ToUserName>  
                  <FromUserName><![CDATA[${fromuser}]]></FromUserName>  
                  <CreateTime>${Date.now()}</CreateTime>  
                  <MsgType><![CDATA[text]]></MsgType>  
                  <Content><![CDATA[${url}\n提取码：${code}]]></Content>  
              </xml>`
              console.log(textXMl);
    return textXMl;
  }
};
