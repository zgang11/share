const md5 = require('md5');
const BaseController = require('../base');

module.exports = (app) => {
  return class UserController extends BaseController {
    async jwtSign({ id, username }) {
      const { app } = this;
      const token = app.jwt.sign({
        id,
        username,
      }, app.config.jwt.secret);
      await app.redis.set(username, token, 'EX', app.config.redisExpier);
      return token;
    }
    parseResult(ctx, user) {
      return {
        ...ctx.helper.unPick(user.dataValues, [ 'password' ]),
        createTime: ctx.helper.timestamp(user.dataValues.createTime),
      };
    }
    async register() {
      const { ctx, app } = this;
      const params = ctx.params();
      const user = await ctx.service.user.getUser(params.username);
      if (user) {
        this.error('用户已经存在');
        return;
      }
      const result = await ctx.service.user.add({
        ...params,
        password: md5(params.password + app.config.salt),
        createTime: ctx.helper.time(),
      });
      if (result) {
        const token = await this.jwtSign({
          id: result.id,
          username: result.username,
        });
        this.success({
          ...this.parseResult(ctx, result),
          token,
        }, '注册成功');
      } else {
        this.error('注册失败');
      }
    }
    async login() {
      const { ctx } = this;
      const { username, password } = ctx.params();
      const user = await ctx.service.user.getUser(username, password);
      if (user) {
        const token = await this.jwtSign({
          id: user.id,
          username: user.username,
        });
        this.success({
          ...this.parseResult(ctx, user),
          token,
        }, '登录成功');
      } else {
        this.error('登录失败');
      }
    }
    async logout(ctx) {
      try {
        await ctx.app.redis.del(ctx.username);
        this.success("退出登录成功");
      } catch (error) {
        this.error("退出登录失败");
      }
    }
    async detail() {
      const { ctx } = this;
      if(!ctx.username) {
        this.error("获取用户信息失败");
        return
      }
      const result = await ctx.service.user.getUser(ctx.username);
      if(result) {
        ctx.body = {
          code: 1000,
          message: "获取用户信息成功",
          data: result
        }
      } else {
        this.error("获取用户信息失败");
      }
    }
  };
};
