const egg = require("egg");
module.exports = class WxService extends egg.Service {
  async addSence(params) {
    const { ctx } = this;
    const result = await ctx.model.Scene.create(params);
    return result;
  }
  async updateSence(params) {
    const { ctx } = this;
    const result = await ctx.model.Scene.update(
      params,
      {
        where: {
          scene: params.scene,
        },
      }
    );
    return result;
  }
  async wxLogin(where) {
    const { ctx } = this;
    const result = await ctx.model.Scene.findOne({
      where,
    });
    return result;
  }
  async returnUrl(code) {
    const { ctx } = this;
    const resV = await ctx.model.Video.findOne({
      where: {
        code,
      },
    });
    const resE = await ctx.model.Ebook.findOne({
      where: {
        code,
      },
    });
    const result = resV || resE;
    return result;
  }
};
