const { Controller } = require('egg');

class BaseController extends Controller {
  success(data = {}, msg = '') {
    const { ctx } = this;
    ctx.body = {
      code: 1000,
      data,
      msg,
    };
  }
  error(msg = '') {
    const { ctx } = this;
    ctx.body = {
      code: 1001,
      msg,
    };
  }
}

module.exports = BaseController;
