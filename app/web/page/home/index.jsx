"use strict";

// eslint-disable-next-line no-unused-vars
import React from "react";
import Frame from "component/frame";
import "./index.css";
import { Carousel, Row, Col } from "antd";
import One from "../../asset/images/1.jpg";
import Two from "../../asset/images/2.jpg";
import Three from "../../asset/images/3.jpg";
import Rank from "../../component/rank";
import Ranking2 from '../../asset/images/ranking2.png';
import Ranking3 from '../../asset/images/ranking3.png';

const Home = (props) => {
  const contentStyle = {
    margin: 0,
    width: "100%",
    height: "100%",
    color: "#fff",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <Frame>
      <div className="home-container">
        <Carousel arrows infinite={false}>
          <div>
            <img src={One} style={contentStyle} />
          </div>
          <div>
            <img src={Two} style={contentStyle} />
          </div>
          <div>
            <img src={Three} style={contentStyle} />
          </div>
        </Carousel>
      </div>
      <div>
        <h3>榜单</h3>
        <Row gutter={16}>
          <Col span={12}><Rank rankIcon={Ranking2} title="教程榜" list={props.video} href='.html' /></Col>
          <Col span={12}><Rank rankIcon={Ranking3} title="书籍榜" list={props.ebook} href=''/></Col>
        </Row>
      </div>
    </Frame>
  );
};

export default Home;
