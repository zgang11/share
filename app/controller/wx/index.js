"use strict";
const path = require("path");
const { parseString } = require("xml2js");
const sharp = require("sharp");
const code2Url = {};

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
      const that = this;
      if(ctx.helper.checkSignature(signature, timestamp, nonce)){
        const xml = ctx.request.body;
        parseString(xml, async function (err, result) {
          if (err) {
            console.error("解析XML时出错:", err);
          }
          console.log("解析XML:", result);
          if(result.xml.MsgType[0] === 'text') {
            that.wxDealWithMessage(result.xml);
          }
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
    }
    async wxDealWithMessage(xml) {
      const { ctx } = this;
      const { Content, FromUserName, ToUserName, MsgId} = xml;
      const touser = FromUserName[0];
      const fromuser = ToUserName[0];
      const [text] = Content;
      console.log("code2Url:", code2Url);
      if(code2Url[text]) {
        const { url, code } = code2Url[text];
        this.sendMessage({url, code, touser, fromuser});
      } else {
        const result = await ctx.service.wx.returnUrl(text);
        if(result) {
          code2Url[text] = {
            url: result.url,
            code: result.code,
          };
        }
      }
    }
    sendMessage(params) {
      const { ctx } = this;
      ctx.type = 'application/xml';  
      ctx.body = ctx.helper.messageXML(params)
    }
    async sendTemplate({url, code, touser}){
      const { ctx } = this;
      const color = "#173177";
      const { access_token }  = JSON.parse(await app.redis.get('accessToken'));
      const _ = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`;
      const result = await ctx.curl(_, {
        method: "POST",
        data: {
          touser,
          url,
          template_id: "9QEaxj6KrayVn_p6sKcGsMTcWdhB4tKtsTcsf8xADhY", 
          data: { url: { value: url, color: "#173177" }, code: { value: code, color } },
        },
        dataType: "json",
        contentType: "json",
      });
      if(result.data.errcode !== 0) {
        console.error('发送模板消息失败');        
      }
    }
    async wxTicket(ctx, scene) {
      try {
        const { access_token }  = JSON.parse(await app.redis.get('accessToken'));
        const url = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${access_token}`;
        console.log("获取ticket URL", url);
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
      } catch(error) {
        console.log(error);
        return null;
      }
    }
    async qrCode(ctx) {
      const { qrcodeRandom, qrcodeTime } = ctx.query;
      const scene = ctx.helper.generateRandomString();
      const res = await this.wxTicket(ctx, scene);
      const { ticket } = res;
      console.log("获取ticket", ticket);
      const url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`;
      console.log("获取二维码URL", url);
      const result = await ctx.curl(url);
      const basePath = path.resolve(__dirname, "../../web/asset/images");

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
          .resize(600, 600) // 调整logo大小
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
  };
};
