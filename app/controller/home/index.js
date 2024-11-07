'use strict';
module.exports = app => {
  return class HomeController extends app.Controller {
    async index(ctx) {
      await ctx.render('home.js', {});
    }   
  };
};