module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Scene = app.model.define('video', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    cover: STRING(400),
    title: STRING(200),
    author: STRING(64),
    keywords: STRING(200),
    description: STRING(500),
    url: STRING(200),
    code: STRING(64),
    content: TEXT,
    showCount: INTEGER,
    price: INTEGER,
    type: INTEGER,
    createTime: DATE,
  });

  return Scene;
};
