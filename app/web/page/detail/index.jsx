"use strict";

// eslint-disable-next-line no-unused-vars
import React, { useMemo } from "react";
import Frame from "component/frame";
import { format } from "date-fns";
import { Tag, Divider, Card, Button, Alert } from "antd";
import "./index.css";
import WXIcon from '../../asset/images/wx.png';

const Home = (props) => {
  const { video, next, prev, recomendList } = props;

  const tagList = useMemo(() => {
    try {
      return video.keywords ? video.keywords.split(/[,|，]/) : [];
    } catch (err) {
      return [];
    }
  });

  const price = useMemo(() => {
    let p = (video.price = video.price ?? 0);
    return parseFloat(p).toFixed(2);
  });
  
  const seo = {
    title: video.title,
    keywords: video.keywords,
    description: video.description,
  }
  return (
    <Frame seo={seo}>
      <div className="home-container">
        <div className="detail-wrapper">
          <div className="detail-left">
            <h3>{video.title}</h3>
            <div>
              <span className="detail-info">
                {format(video.createTime, "YYYY-M-d H:mm:ss")}
              </span>
              {video.author ? (
                <span className="detail-info">作者：{video.author}</span>
              ) : (
                ""
              )}
              <span className="detail-info">
                浏览量：{video.showCount ?? 0}
              </span>
              <span className="detail-info">
                {tagList.map((item) => (
                  <Tag color="magenta" key={item}>
                    {item}
                  </Tag>
                ))}
              </span>
            </div>
            <Divider
              variant="dotted"
              style={{
                borderColor: "#0c6cf6",
              }}
            />
            <div className="detail-content">
              <div dangerouslySetInnerHTML={{ __html: video.content }}></div>
            </div>
            {/* <Card>
              该资源下载价格：¥<span className="price">{price}</span>
              <span className="buy-tip-login">
                |&nbsp;&nbsp;登录后购买可保存购买记录
              </span>
              <br />
              <Button type="primary" className="buy-btn">
                立即获取
              </Button>
              <div className="buy-tip">
                支付后即可显示百度网盘下载链接，可自行下载。资源内容无加密，内容完整。如有链接失效请公众号联系。
              </div>
            </Card> */}
            <Card>
              <div className="buy-tip">
                登录或搜索「保持分享」关注微信公众号，回复 <span style={{fontWeight: "bold"}}>{ video.code }</span> 即可获取下载链接。
              </div>
              <img className="wx-icon" src={WXIcon} />
            </Card>
            <Alert
              className="alert"
              message="本站部分资源收集于网络，若侵犯了您的合法权益，请联系我们删除！"
              type="error"
            />
            <div className="detail-comment">
              {prev && prev.id ? (
                <div className="upDown-box">
                  <span className="upDown">上一篇</span>
                  <a href={`/${prev.id}.html`} className="upDown-title">
                    {prev.title}
                  </a>
                </div>
              ) : (
                <span></span>
              )}
              {next && next.id ? (
                <div className="upDown-box">
                  <span className="upDown upDown-next">下一篇</span>
                  <a href={`/${next.id}.html`} className="upDown-title">
                    {next.title}
                  </a>
                </div>
              ) : (
                <span></span>
              )}
            </div>
          </div>
          <div className="detail-right">
            <div className="recomend">
              <span className="recomend-for-you">为你推荐</span>
              <div>
                {recomendList.map((item) => (
                  <div key={item.id} className="recomend-item">
                    <a href={`/${item.id}.html`} className="recomend-img">
                      <img src={item.cover} />
                    </a>
                    <div className="recomend-title">
                      <a href={`/${item.id}.html`}>{item.title}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default Home;
