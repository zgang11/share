const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};
  const password = 'shualeecode1314_CFZY';
  const userConfig = {
    // myAppName: 'egg',
    salt: 'zhanggang',
    redisExpier: 60 * 60 * 2,
  };
  const host = "8.152.222.173";

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
    dir: [path.join(app.baseDir, 'public'), path.join(app.baseDir, 'app/public')]
  };

  exports.multipart = {
    mode: 'file',
  };

  exports.keys = '123456';

  exports.middleware = [
    // 'locals',
    // 'access'
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
    appId: 'wx57381f3f017632d5',
    appsecret: 'a7b58c1e7d92229246f8122c87491398',
  }

  exports.security = {
    csrf: {
      enable: false
    }
  };

  exports.mysql = {
    client: {
      host,
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
    host,
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
      host, // Redis host
      password: 'shualeecode1314_CFZY',
      db: 0,
    },
  };
 
  exports.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  exports.auth = {
    exclude: [ '/api/wxGet', '/api/qrCode', '/api/wxLogin', '/', '/login', '/home', '/frontweb', '/createVideo', '/updateVideo', '/public'],
  }

  return {
    ...exports,
    ...userConfig,
  };
};
