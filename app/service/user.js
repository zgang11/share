const egg = require("egg");
module.exports = class UserService extends egg.Service {
  async detail(openId) {
    const { ctx } = this;
    const result = null;
    try {
      result = await ctx.model.Scene.findAll({
        where: {
          openId: openId,
        },
      });
      return result;
    } catch (error) {    
      return null;
    }
  }
};
