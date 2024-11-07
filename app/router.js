
'use strict';
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

  // wx
  router.get('/api/wxGet', controller.wx.index.wxGet);
  router.post('/api/wxGet', controller.wx.index.wxGetMessage);
  // router.get('/api/wxGetToken', controller.wx.index.wxGetToken);
  // router.get('/api/wxTicket', controller.wx.index.wxTicket);
  router.get('/api/qrCode', controller.wx.index.qrCode);
  router.get('/api/wxLogin', controller.wx.index.wxLogin);
  router.get('/api/logout', controller.wx.index.logout);


  router.get('/', controller.home.index.index);
  router.get('/login', controller.login.index.index);
};
