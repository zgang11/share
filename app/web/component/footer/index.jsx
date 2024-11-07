import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

function FooterComponent() {
  return <Footer  style={{ textAlign: 'center', background: '#fff', color: '#8a8f8d' }}>
    分享·share ©{new Date().getFullYear()} Created by zgang1
  </Footer>;
}

export default FooterComponent;