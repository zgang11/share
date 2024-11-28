import React, { useEffect } from 'react';
import { Layout, Button } from 'antd';
import './index.css';
import LogoIcon from '../../asset/images/logo.svg';
import TitleIcon from '../../asset/images/title.jpg';
import { useState } from 'react';
import UserIcon from './userIcon'
import { detail } from '../../utils/api';

const { Header } = Layout;

function HeaderComponent() {
  const [isLogin, setIsLogin] = useState(false);
  const [location, setLocation] = useState(null);
  const buttonList = [
    {
      reg: [new RegExp('^/$')],
      text: '首页',
      href: '/'
    },
    {
      reg: [new RegExp('/frontweb'), new RegExp(/\/\d{1,}\.html/)],
      text: '前端开发',
      href: '/frontweb'
    },
    {
      reg: [new RegExp('/ebook'), new RegExp(/\/\d{1,}$/)],
      text: '电子书',
      href: '/ebook'
    },
  ]

  const getDetail = async () => {
    const result = await detail();
    if(result.code === 1000) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }

  const refeshLoginStatus = () => {
    setIsLogin(false);
    sessionStorage.removeItem('token');
  }

  useEffect(() => {
    setLocation(window.location);
    getDetail();
  }, [])

  return <Header className="header">
    <div>
      <a style={{ display: 'flex', alignItems: 'center'}} href="/">
        <img className="logo-icon" src={LogoIcon} />
        <img className="title-icon" src={TitleIcon} alt="" />
      </a>
    </div>
    <div className='header-menu'>
        {buttonList.map((item) => {
          return <Button className={item.reg.some((reg) => reg.test(location?.pathname)) ? 'active' : ''} key={item.href} color="default" variant="link" href={item.href}><h4>{item.text}</h4></Button>
        })}
    </div>
    <div>
      { !isLogin ? <Button type="link" color="primary" variant="outlined" href='/login' size="small">登录</Button> : <UserIcon refeshLoginStatus={refeshLoginStatus} /> }
    </div>
  </Header>;
}

export default HeaderComponent;