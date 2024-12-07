import React, { useState, useEffect } from "react";
import { Layout, Button, Radio } from "antd";
import "./index.css";
import LogoIcon from "../../asset/images/logo.svg";
import TitleIcon from "../../asset/images/title.jpg";
import UserIcon from './userIcon'
import UserModal from "./user-modal";
import { detail } from "../../utils/api";

const { Header } = Layout;

function HeaderComponent() {
  const [isLogin, setIsLogin] = useState(false);
  const [location, setLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("login");

  const buttonList = [
    {
      reg: [new RegExp("^/$")],
      text: "首页",
      href: "/",
    },
    {
      reg: [new RegExp("/frontweb"), new RegExp(/\/\d{1,}\.html/)],
      text: "前端开发",
      href: "/frontweb",
    },
    {
      reg: [new RegExp("/ebook"), new RegExp(/\/\d{1,}$/)],
      text: "电子书",
      href: "/ebook",
    },
  ];

  const getDetail = async () => {
    const result = await detail();
    if (result.code === 1000) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  const refeshLoginStatus = () => {
    setIsLogin(false);
    sessionStorage.removeItem('token');
  }

  const handleChange = (type) => {
    setType(type);
    console.log(type);
    setIsModalOpen(true);
  };

  useEffect(() => {
    setLocation(window.location);
    getDetail();
  }, []);

  return (
    <Header className="header">
      <div>
        <a style={{ display: "flex", alignItems: "center" }} href="/">
          <img className="logo-icon" src={LogoIcon} />
          <img className="title-icon" src={TitleIcon} alt="" />
        </a>
      </div>
      <div className="header-menu">
        {buttonList.map((item) => {
          return (
            <Button type="link" key={item.href} href={item.href}>
              <h4
                className={
                  item.reg.some((reg) => reg.test(location?.pathname))
                    ? "active"
                    : ""
                }
              >
                {item.text}
              </h4>
            </Button>
          );
        })}
      </div>
      <div>
        {isLogin ? (
          <UserIcon refeshLoginStatus={refeshLoginStatus} />
        ) : (
          <div>
            <Radio.Group size="small">
              <Radio.Button
                value="login"
                size="small"
                onClick={() => handleChange("login")}
              >
                登录
              </Radio.Button>
              <Radio.Button
                value="register"
                size="small"
                onClick={() => handleChange("register")}
              >
                注册
              </Radio.Button>
            </Radio.Group>
            <UserModal {...{ isModalOpen, type, setIsModalOpen, getDetail }} />
          </div>
        )}
      </div>
    </Header>
  );
}

export default HeaderComponent;
