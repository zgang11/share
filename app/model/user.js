'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    password: STRING(64),
    avatar: TEXT('long'),
    sign: STRING(300),
    phone: STRING(20),
    createTime: DATE,
    updateTime: DATE,
  });

  return User;
};
