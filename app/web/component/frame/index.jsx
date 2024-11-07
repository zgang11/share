import React from 'react';
import './index.css';
import HTML from 'component/layout';
import Header from 'component/header'
import Footer from 'component/footer'
import { Layout } from 'antd';

const { Content } = Layout;

function LayoutComponent(props) {
  return <HTML>
    <Layout className="page-wrapper">
      <Header />
      <Content className='main'>
        {props.children}
      </Content>
      <Footer />
    </Layout>
  </HTML>;
}

export default LayoutComponent;