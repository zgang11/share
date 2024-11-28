module.exports = app => {
  const coreMiddleware = app.config.coreMiddleware;
  app.config.coreMiddleware = [
    ...coreMiddleware,
    // 'auth',
  ];
};