//生成随机值作为场景值
export function generateRandomString() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const randomLength = Math.floor(Math.random() * 4) + 5; // 生成一个5到8之间的随机整数
  let result = "";
  for (let i = 0; i < randomLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}