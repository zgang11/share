"use strict";
const path = require("path");
const { parseString } = require("xml2js");
const sharp = require("sharp");

module.exports = (app) => {
  return class WxController extends app.Controller {
    async jwtSign({ id, openId }) {
      const { app } = this;
      const token = app.jwt.sign({
        id,
        openId,
      }, app.config.jwt.secret);
      await app.redis.set(openId, token, 'EX', app.config.redisExpier);
      return token;
    }
    async wxGet(ctx) {
      const { signature, timestamp, nonce, echostr } = ctx.query;
      try {
        if (ctx.helper.checkSignature(signature, timestamp, nonce)) {
          console.log("signature校验通过");
          ctx.body = String(echostr);
        } else {
          console.error("加密字符串不等于微信返回字符串，验证失败！！！");
          ctx.body = {
            code: 1001,
            message: "验证失败！",
          };
        }
      } catch (error) {
        ctx.body = {
          code: 1001,
          message: "验证失败！",
        };
      }
    }
    async wxGetMessage(ctx) {
      const { signature, timestamp, nonce } = ctx.query;
      if(ctx.helper.checkSignature(signature, timestamp, nonce)){
        const xml = ctx.request.body;
        parseString(xml, async function (err, result) {
          if (err) {
            console.error("解析XML时出错:", err);
          }
          console.log("解析XML:", result);
          if(result.xml.Ticket) {
            const res = await ctx.service.wx.updateSence({
              openId: result.xml.FromUserName[0],
              scene: result.xml.EventKey[0],
            })
            if(!res) {
              console.log('更新失败sence失败')
            }
          }
        });
      }
      ctx.body = "success";
    }
    async wxTicket(ctx, scene) {
      const { access_token } = await app.config.accessToken;
      const url = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${access_token}`;
      const result = await ctx.curl(url, {
        method: "POST",
        data: {
          expire_seconds: 604800, //有效时间
          action_name: "QR_STR_SCENE", //类型
          action_info: { scene: { scene_str: scene } }, //场景值，我用的是随机
        },
        dataType: "json",
        contentType: "json",
      });
      return result.data;
    }
    async qrCode(ctx) {
      const { qrcodeRandom, qrcodeTime } = ctx.query;
      const scene = ctx.helper.generateRandomString();
      const res = await this.wxTicket(ctx, scene);
      const { ticket } = res;
      console.log("获取ticket", ticket);
      const url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`;
      const result = await ctx.curl(url);
      console.log('-----', result.data);
      const basePath = path.resolve(__dirname, "../../../public/img");

      const addResult = await ctx.service.wx.addSence({
        qrcodeRandom,
        qrcodeTime: parseInt(qrcodeTime),
        scene,
        openId: "",
        createTime: ctx.helper.timestamp(),
      });
      if (addResult) {
        const logo = await sharp(`${basePath}/logo.svg`);
        await sharp(result.data)
          .resize(500, 500) // 调整logo大小
          .composite([
            {
              input: await logo.resize(100, 100).png().toBuffer(),
              gravity: "center",
            },
          ]) // 在二维码中央添加logo
          .toBuffer().then((buffer) => {
            ctx.body = {
              code: 1000,
              data: `data:image/jpeg;base64,${buffer.toString('base64')}`,
            };
          }).catch((err) => {
            ctx.body = {
              code: 1001,
              message: `生成二维码失败，请稍后再试！`,
            };
          });
      } else {
        ctx.body = {
          code: 1001,
          message: `生成二维码失败，请稍后再试！`,
        };
      }
    }
    async wxLogin(ctx) {
      const { qrcodeRandom, qrcodeTime } = ctx.query;
      const result = await ctx.service.wx.wxLogin({
        qrcodeRandom,
        qrcodeTime: parseInt(qrcodeTime),
      })
      if(result && result.openId) {
        const token = await this.jwtSign({
          id: result.id,
          openId: result.openId,
        });
        ctx.body = {
          code: 1000,
          token,
        };
      } else {
        ctx.body = {
          code: 1001,
          message: "未查询到扫码",
        };
      }
    }
    async logout(ctx) {
      try {
        await ctx.app.redis.del(ctx.getToken);
        ctx.body = {
          code: 1000,
          message: "退出登录成功",
        }
      } catch (error) {
        ctx.body = {
          code: 1001,
          message: "退出登录失败",
        }
      }
    }
  };
};