module.exports = {
  get getToken() {
    const token = this.request.headers.token;
    let tokenCache;
    try {
      tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;
    } catch (error) {
      console.log(error);
    }
    return tokenCache ? tokenCache.openId : undefined;
  }
}