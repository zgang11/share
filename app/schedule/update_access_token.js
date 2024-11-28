const Subscription = require('egg').Subscription;

module.exports = app => {
  return class UpadteAccessToken extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
      return {
        interval: '7140s', // 两个小时执行一次
        type: 'all', // 指定所有的 worker 都需要执行
        immediate: true,
      };
    }
    async subscribe() {
      const params = {
        grant_type: "client_credential",
        appid: app.config.wxConfig.appId,
        secret: app.config.wxConfig.appsecret,
      };
      const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=${params.grant_type}&appid=${params.appid}&secret=${params.secret}`;
      const result = await this.ctx.curl(url, {
        dataType: "json",
      });
      console.log("定时任务执行开始...", this.ctx.app.config.accessToken);
      this.ctx.app.config.accessToken = result.data;
      this.ctx.app.redis.set('accessToken', JSON.stringify(result.data), 'EX', app.config.redisExpier);
      console.log("定时任务执行结束...", this.ctx.app.config.accessToken);
    }
  }
}