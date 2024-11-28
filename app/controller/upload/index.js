const path = require("path");
const fsPromises = require("fs-promise");

module.exports = (app) => {
  return class UploadController extends app.Controller {
    async upload() {
      const { ctx } = this;
      const fileData = ctx.request.files[0];
      const uploadFilePath = path.join(__dirname, "../../../public/upload/");
      const file = await fsPromises.readFile(fileData.filepath);
      // 生成服务端文件名
      const newFileName = ctx.helper.timestamp() + "_" + fileData.filename;
      const serverFilePath = uploadFilePath + newFileName;
      // 保存文件
      await fsPromises.writeFile(serverFilePath, file);
      ctx.body = {
        code: 1000,
        data: {
          url: "http://" + ctx.host + "/public/" + "/upload/" + newFileName,
        },
        message: "上传成功",
      };
    }
  };
};
