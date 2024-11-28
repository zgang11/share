module.exports = app => {
  return class HomeController extends app.Controller {
    async home() {
      const { ctx } = this;
      const video = await ctx.service.video.findTopVideo();
      const ebook = await ctx.service.ebook.findTopEbook();
      await ctx.render('home.js', { video, ebook });
    }   
    async login(ctx) {
      await ctx.render('login.js', {});
    }
    // video
    async detail(ctx) {
      const { id } = ctx.params;
      const video = await ctx.service.video.detail(id, true);
      const next = await ctx.service.video.findNextVideo(id);
      const prev = await ctx.service.video.findPrevVideo(id);

      const { keywords } = video;
      const list = keywords ? keywords.split(/[,|，]/) : [];
      const result = await ctx.service.video.findRecomendList(list);
      const recomendList = result.filter(item => {
        return item.id !== video.id
      })
      await ctx.render('detail.js', { video, next, prev, recomendList });
    }
    async frontweb(ctx) {
      await ctx.render('frontweb.js', {});
    }
    async createVideo(ctx) {
      await ctx.render('createVideo.js', {});
    }
    async updateVideo(ctx) {
      const { id } = ctx.params;
      const video = await ctx.service.video.detail(id);
      await ctx.render('updateVideo.js', { video });
    }
    // ebook
    async ebook(ctx) {
      await ctx.render('ebook.js', {});
    }
    async createEbook(ctx) {
      await ctx.render('createEbook.js', {});
    }
    async updateEbook(ctx) {
      const { id } = ctx.params;
      const ebook = await ctx.service.ebook.detail(id);
      await ctx.render('updateEbook.js', { ebook });
    }
    async ebookDetail(ctx) {
      const { id } = ctx.params;
      const ebook = await ctx.service.ebook.detail(id, true);
      const next = await ctx.service.ebook.findNextEbook(id);
      const prev = await ctx.service.ebook.findPrevEbook(id);

      const { keywords } = ebook;
      const list = keywords ? keywords.split(/[,|，]/) : [];
      const result = await ctx.service.ebook.findRecomendEbook(list);
      const recomendList = result.filter(item => {
        return item.id !== ebook.id
      })
      await ctx.render('ebookDetail.js', { ebook, next, prev, recomendList });
    }
  };
};