module.exports = {
  get getToken() {
    const token = this.request.headers.token;
    let tokenCache;
    try {
      tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;
    } catch (error) {
      console.log(error);
    }
    console.log(tokenCache);
    return tokenCache ? tokenCache.openId : undefined;
  },
  get username() {
    const token = this.request.headers.token;
    let tokenCache;
    try {
      tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;
    } catch (error) {
      console.log(error);
    }
    return tokenCache ? tokenCache.username : undefined;
  },
  params(key) {
    console.log(this.query, this.request.body);
    const method = this.request.method;
    if (method === 'GET') {
      return key ? this.query[key] : this.query;
    }
    return key ? this.request.body[key] : this.request.body;
  },
}