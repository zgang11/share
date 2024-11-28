module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Ebook = app.model.define('ebook', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING(200),
    cover: STRING(400),
    author: STRING(64),
    keywords: STRING(200),
    description: STRING(500),
    content: TEXT,
    url: STRING(200),
    code: STRING(64),
    showCount: INTEGER,
    price: INTEGER,
    type: INTEGER,
    createTime: DATE,
  });

  return Ebook;
};
