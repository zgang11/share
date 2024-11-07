import React from 'react';
import { Layout, Button } from 'antd';
import './index.css';
import LogoIcon from '../../asset/images/logo.svg';

const { Header } = Layout;

function HeaderComponent() {
  return <Header className="header">
    <div>
      <img className="logo-icon" src={LogoIcon} />
    </div>
    <div>mene</div>
    <div>
      <Button type="link" href='/login'>登录</Button>
    </div>
  </Header>;
}

export default HeaderComponent;