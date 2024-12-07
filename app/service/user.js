const egg = require("egg");
const md5 = require('md5');

module.exports = class UserService extends egg.Service {
  async detail(openId) {
    const { ctx } = this;
    let result = null;
    try {
      result = await ctx.model.Scene.findAll({
        where: {
          openId,
        },
      });
      return result;
    } catch (error) {  
      return null;
    }
  }
  async add(params) {
    const { ctx } = this;
    const result = await ctx.model.User.create(params);
    return result;
  }
  async getUser(username, password) {
      const { ctx, app } = this;
      const where_ = password ? { username, password: md5(password + app.config.salt) } : { username };
      const result = await ctx.model.User.findOne({
        where: where_,
      });
      return result;
  }
};
