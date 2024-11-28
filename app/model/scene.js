module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Scene = app.model.define('scene', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    openId: STRING(64),
    scene: STRING(64),
    qrcodeRandom: STRING(10),
    qrcodeTime: DATE,
    createTime: DATE,
  });

  return Scene;
};
