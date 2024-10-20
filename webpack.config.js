'use strict';
// https://yuque.com/easy-team/egg-react
const path = require('path');
const resolve = (filepath) => path.resolve(__dirname, filepath);

module.exports = {
  entry: {
    example: 'app/web/page/example/index.jsx',
    intro: 'app/web/page/intro/index.jsx',
    async: 'app/web/page/example/async/index.jsx',
    'example/stateless': 'app/web/page/example/stateless.js',
    'example/node': 'app/web/page/example/node.jsx',
    'example/data': 'app/web/page/example/data.jsx',
    'example/hook': 'app/web/page/example/hook.jsx',
    'example/context': 'app/web/page/example/context.jsx'
  },
  loaders: {
    babel: {
      include: [resolve('app/web'), resolve('node_modules')]
    },
    less: {
      include: [resolve('app/web'), resolve('node_modules')],
      options: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#00b96b',
          'link-color': '#1DA57A',
          'border-radius-base': '5px'
        }
      }
    }
  },
};
