const egg = require("egg");
module.exports = class VideoService extends egg.Service {
  attributes = { exclude: ['url'] }
  async addVideo(params) {
    const { ctx } = this;
    const result = await ctx.model.Video.create(params);
    return result;
  }
  async list(params) {
    const { ctx } = this;
    const result = await ctx.model.Video.findAll({
      attributes: this.attributes,
      limit: params.pageSize,
      offset: (params.pageNum - 1) * params.pageSize,
    });
    const total = await ctx.model.Video.count();
    return {
      list: result,
      total,
    };
  }
  async updateVideo(params) {
    const { ctx } = this;
    const result = await ctx.model.Video.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }
  async deleteVideo(id) {
    const { ctx } = this;
    const result = await ctx.model.Video.destroy({
      where: {
        id,
      },
    });
    return result;
  }
  async detail(id, withExclude = false) {
    const { ctx } = this;
    const attributes =  { exclude: withExclude ? ['url'] : [] };
    const result = await ctx.model.Video.findOne({
      attributes,
      where: {
        id,
      },
    });
    await ctx.model.Video.update({
      showCount: result.showCount + 1,
    }, {
      where: { id },
    });
    return result;
  }
  async findNextVideo(id) {
    const { ctx, app } = this;
    const { gte } = app.Sequelize.Op;
    const id_ = Number(id) + 1;
    const result = await ctx.model.Video.findOne({
      attributes: this.attributes,
      where: {
        id: {
          [gte]: id_, // 查找id大于给定id的记录
        },
      },
      order: [
        ["id", "ASC"], // 根据id升序排序
      ],
    });
    return result;
  }

  async findPrevVideo(id) {
    const { ctx, app } = this;
    const { lte } = app.Sequelize.Op;
    const id_ = Number(id) - 1;
    const result = await ctx.model.Video.findOne({
      attributes: this.attributes,
      where: {
        id: {
          [lte]: id_, // 查找id小于给定id的记录
        },
      },
      order: [
        ["id", "DESC"], // 根据id降序排序
      ],
    });
    return result;
  }

  async findRecomendList(list) {
    const { ctx, app } = this;
    const { like, or } = app.Sequelize.Op;
    const or_ = [];
    for (let i = 0; i < list.length; i++) {
      or_.push({
        title: {
          [like]: `%${list[i]}%`,
        },
      });
    }
    const result = await ctx.model.Video.findAll({
      attributes: this.attributes,
      where: {
        [or]: or_,
      },
    });
    return result;
  }

  async findTopVideo() {
    const { ctx } = this;
    const result = await ctx.model.Video.findAll({
      attributes: this.attributes,
      order: [
        ["showCount", "DESC"], // 根据id降序排序
      ],
    });
    return result.slice(0, 5);
  }
};
