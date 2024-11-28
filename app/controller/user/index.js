module.exports = (app) => {
  return class UserController extends app.Controller {
    async logout(ctx) {
      try {
        await ctx.app.redis.del(ctx.getToken);
        ctx.body = {
          code: 1000,
          message: "退出登录成功",
        }
      } catch (error) {
        ctx.body = {
          code: 1001,
          message: "退出登录失败",
        }
      }
    }
    async detail() {
      const { ctx } = this;
      const result = await ctx.service.user.detail(ctx.getToken);
      if(result) {
        ctx.body = {
          code: 1000,
          message: "获取用户信息成功",
          data: result
        }
      } else {
        ctx.body = {
          code: 1001,
          message: "获取用户信息成功",
        }
      }
    }
  };
};
