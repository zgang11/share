
module.exports = app => {
  const { router, controller } = app;
  // router.get('/example/stateless', controller.example.index.statelessRender);
  // router.get('/example/hook', controller.example.index.reactHook);
  // router.get('/example/async', controller.example.index.asyncComponentRender);
  // router.get('/example/context', controller.example.data.contextRender);
  // router.get('/example/data/node', controller.example.data.nodeDataRender);
  // router.get('/example/data/async', controller.example.data.asyncDataRender);
  // router.get('/example/data/api/article', controller.example.data.article);
  // router.get('/example', controller.example.index.index);
  // 服务端渲染页面路由
  router.get('/', controller.home.index.home);
  router.get('/login', controller.home.index.login);
  router.get('/frontweb', controller.home.index.frontweb);
  router.get('/createVideo', controller.home.index.createVideo);
  router.get('/updateVideo/:id', controller.home.index.updateVideo);
  router.get('/:id.html', controller.home.index.detail);
  router.get('/ebook', controller.home.index.ebook);
  router.get('/createEbook', controller.home.index.createEbook);
  router.get('/updateEbook/:id', controller.home.index.updateEbook);
  router.get('/:id', controller.home.index.ebookDetail);

  // wx
  router.get('/api/wxGet', controller.wx.index.wxGet);
  router.post('/api/wxGet', controller.wx.index.wxGetMessage);
  // router.get('/api/wxGetToken', controller.wx.index.wxGetToken);
  // router.get('/api/wxTicket', controller.wx.index.wxTicket);
  router.get('/api/qrCode', controller.wx.index.qrCode);
  router.get('/api/wxLogin', controller.wx.index.wxLogin);

  router.get('/api/detail', controller.user.index.detail);
  router.get('/api/logout', controller.user.index.logout);

  // 视频
  router.post('/api/video/create', controller.video.index.create);
  router.post('/api/video/list', controller.video.index.list);
  router.post('/api/video/update', controller.video.index.update);
  router.get('/api/video/delete', controller.video.index.delete);

  // 上传图片
  router.post('/api/upload', controller.upload.index.upload);

  // Ebook
  router.post('/api/ebook/create', controller.ebook.index.create);
  router.post('/api/ebook/list', controller.ebook.index.list);
  router.post('/api/ebook/update', controller.ebook.index.update);
  router.get('/api/ebook/delete', controller.ebook.index.delete);

};
