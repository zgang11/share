const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};
  const password = 'shualeecode1314_CFZY';
  const userConfig = {
    // myAppName: 'egg',
    salt: 'zhanggang',
    redisExpier: 60 * 60 * 24,
  };

  exports.accessToken = null;

  exports.bodyParser ={
		enable: true,
		encoding: 'utf8',
		formLimit: '100kb',
		jsonLimit: '100kb',
		strict: true,
		// @see https://github.com/hapijs/qs/blob/master/lib/parse.js#L8 for more options
		queryString: {
			arrayLimit: 100,
			depth: 5,
			parameterLimit: 1000
		},
		enableTypes: ['json', 'form', 'text'],
		extendTypes: {
			text: ['text/xml', 'application/xml']
		}
	};


  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'locals',
    'access'
  ];

  exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks'
    }
  };

  exports.reactssr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html')
  };

  exports.wxConfig = {
    token: 'Z123456d',
    appId: 'wxeb145bdebe1d18c8',
    appsecret: '20ff033df50a3e3e15880d5d64bb7c25',
  }

  exports.security = {
    csrf: {
      enable: false
    }
  };

  exports.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password,
      database: 'share_web'
    },
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  };

  exports.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password,
    database: 'share_web',
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  };

  exports.jwt = {
    secret: 'zgang1',
  }

  exports.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: 'shualeecode1314_CFZY',
      db: 0,
    },
  };

  return {
    ...exports,
    ...userConfig,
  };
};
