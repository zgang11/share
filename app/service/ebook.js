const egg = require("egg");
module.exports = class EbookService extends egg.Service {
  attributes = { exclude: ['url'] }
  async addEbook(params) {
    const { ctx } = this;
    const result = await ctx.model.Ebook.create(params);
    return result;
  }
  async list(params) {
    const { ctx } = this;
    const result = await ctx.model.Ebook.findAll({
      attributes: this.attributes,
      limit: params.pageSize,
      offset: (params.pageNum - 1) * params.pageSize,
    });
    const total = await ctx.model.Ebook.count();
    return {
      list: result,
      total,
    };
  }
  async updateEbook(params) {
    const { ctx } = this;
    const result = await ctx.model.Ebook.update(params, {
      where: {
        id: params.id,
      },
    });
    return result;
  }
  async deleteEbook(id) {
    const { ctx } = this;
    const result = await ctx.model.Ebook.destroy({
      where: {
        id,
      },
    });
    return result;
  }
  async detail(id, withExclude = false) {
    const { ctx } = this;
    const attributes =  { exclude: withExclude ? ['url'] : [] };
    const result = await ctx.model.Ebook.findOne({
      attributes,
      where: {
        id,
      },
    });
    await ctx.model.Ebook.update(
      {
        showCount: (result?.showCount || 0) + 1,
      },
      {
        where: { id },
      }
    );
    return result;
  }

  async findNextEbook(id) {
    const { ctx, app } = this;
    const { gte } = app.Sequelize.Op;
    const id_ = Number(id) + 1;
    const result = await ctx.model.Ebook.findOne({
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

  async findPrevEbook(id) {
    const { ctx, app } = this;
    const { lte } = app.Sequelize.Op;
    const id_ = Number(id) - 1;
    const result = await ctx.model.Ebook.findOne({
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

  async findRecomendEbook(list) {
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
    const result = await ctx.model.Ebook.findAll({
      attributes: this.attributes,
      where: {
        [or]: or_,
      },
    });
    return result;
  }

  async findTopEbook() {
    const { ctx } = this;
    const result = await ctx.model.Ebook.findAll({
      attributes: this.attributes,
      order: [
        ["showCount", "DESC"], // 根据id降序排序
      ],
    });
    return result.slice(0, 3);
  }
};
