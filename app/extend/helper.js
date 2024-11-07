const crypto = require("crypto");

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
};
