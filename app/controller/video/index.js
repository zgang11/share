module.exports = (app) => {
  return class VideoController extends app.Controller {
    async create() {
      const { ctx } = this;
      const params = ctx.request.body;
      const result = await ctx.service.video.addVideo({
        ...params,
        createTime: ctx.helper.timestamp(),
      });
      if(result) {
        ctx.body = {
          code: 1000,
          message: "添加成功",
        }
      } else {
        ctx.body = {
          code: 1001,
          message: "添加失败",
        }
      }
    }
    async list() {
      const { ctx } = this;
      const result = await ctx.service.video.list(ctx.request.body);
      if(result) {
        ctx.body = {
          code: 1000,
          message: "获取成功",
          data: result
        }
      } else {
        ctx.body = {
          code: 1001,
          message: "获取失败",
        }
      }
    }
    async update() {
      const { ctx } = this;
      const params = ctx.request.body;
      const result = await ctx.service.video.updateVideo(params);
      if(result) {
        ctx.body = {
          code: 1000,
          message: "更新成功",
        }
      } else {
        ctx.body = {
          code: 1001,
          message: "更新失败",
        }
      }
    }
    async delete() {
      const { ctx } = this;
      const { id } = ctx.query;
      const result = await ctx.service.video.deleteVideo(id);
      if(result) {
        ctx.body = {
          code: 1000,
          message: "删除成功",
        }
      } else {
        ctx.body = {
          code: 1001,
          message: "删除失败",
        }
      }
    }
  };
};
