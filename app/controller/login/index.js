'use strict';
module.exports = app => {
  return class LoginController extends app.Controller {
    async index(ctx) {
      await ctx.render('login.js', { message: 'Egg React Server Side Render 使用说明' });
    }
  };
};