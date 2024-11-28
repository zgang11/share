module.exports = options => {
  return async (ctx, next) => {
    const url = ctx.request.url;
    console.log("url:", url);
    const token = ctx.request.header.token;
    const oldToken = await ctx.app.redis.get(ctx.getToken);
    const user = oldToken ? token === oldToken : oldToken;
    if (!user && !options.exclude.includes(url.split('?')[0])) {
      ctx.body = {
        status: 1001,
        errMsg: '用户未登录',
      };
    } else {
      await next();
    }
  };
};
