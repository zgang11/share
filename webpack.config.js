// https://yuque.com/easy-team/egg-react
const path = require('path');
const resolve = (filepath) => path.resolve(__dirname, filepath);

module.exports = {
  entry: {
    home: 'app/web/page/home/index.jsx',
    login: 'app/web/page/login/index.jsx',
    frontweb: 'app/web/page/frontweb/index.jsx',
    createVideo: 'app/web/page/video/create.jsx',
    updateVideo: 'app/web/page/video/update.jsx',
    detail: 'app/web/page/detail/index.jsx',
    ebook: 'app/web/page/ebook/index.jsx',
    createEbook: 'app/web/page/ebook/create.jsx',
    updateEbook: 'app/web/page/ebook/update.jsx',
    ebookDetail: 'app/web/page/ebook/detail.jsx',
    // example: 'app/web/page/example/index.jsx',
    // async: 'app/web/page/example/async/index.jsx',
    // 'example/stateless': 'app/web/page/example/stateless.js',
    // 'example/node': 'app/web/page/example/node.jsx',
    // 'example/data': 'app/web/page/example/data.jsx',
    // 'example/hook': 'app/web/page/example/hook.jsx',
    // 'example/context': 'app/web/page/example/context.jsx'
  },
  loaders: {
    babel: {
      include: [resolve('app/web'), resolve('node_modules')]
    },
    less: {
      include: [resolve('app/web'), resolve('node_modules')],
    }
  },
};
