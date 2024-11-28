"use strict";

// eslint-disable-next-line no-unused-vars
import React, { useMemo } from "react";
import Frame from "component/frame";
import { format } from "date-fns";
import { Tag, Divider, Card, Button, Alert } from "antd";
import WXIcon from '../../asset/images/wx.png';
import "./detail.css";

const Home = (props) => {
  const { ebook, next, prev, recomendList } = props;

  const tagList = useMemo(() => {
    try {
      
      return ebook.keywords ? ebook.keywords.split(/[,|，]/) : [];
    } catch (err) {
      return [];
    }
  });

  const seo = {
    title: ebook.title,
    keywords: ebook.keywords,
    description: ebook.description,
  }
  return (
    <Frame seo={seo}>
      <div className="home-container">
        <div className="detail-wrapper">
          <div className="detail-left">
            <h3>{ebook.title}</h3>
            <div>
              <span className="detail-info">
                {format(ebook.createTime, "YYYY-M-d H:mm:ss")}
              </span>
              {ebook?.author ? (
                <span className="detail-info">作者：{ebook?.author}</span>
              ) : (
                ""
              )}
              <span className="detail-info">
                浏览量：{ebook?.showCount ?? 0}
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
            <div className="detail-cover">
              <img src={ebook?.cover} alt="" />
            </div>
            <div className="detail-content">
              <div dangerouslySetInnerHTML={{ __html: ebook.content }}></div>
            </div>
            <Card>
              登录或搜索「保持分享」关注微信公众号，，回复 <span style={{fontWeight: "bold"}}>{ ebook.code }</span> 即可获取下载链接。
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
                  <a href={`/${prev.id}`} className="upDown-title">
                    {prev.title}
                  </a>
                </div>
              ) : (
                <span></span>
              )}
              {next && next.id ? (
                <div className="upDown-box">
                  <span className="upDown upDown-next">下一篇</span>
                  <a href={`/${next.id}`} className="upDown-title">
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
                    <a href={`/${item.id}`} className="recomend-img">
                      <img src={item.cover} />
                    </a>
                    <div className="recomend-title">
                      <a href={`/${item.id}`}>{item.title}</a>
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
