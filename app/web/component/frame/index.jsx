import React from 'react';
import './index.css';
import HTML from 'component/layout';
import Header from 'component/header'
import Footer from 'component/footer'
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

const { Content } = Layout;

function LayoutComponent(props) {
  return <HTML {...props.seo}>
    <ConfigProvider locale={zhCN}>
      <Layout className="page-wrapper">
        <Header />
        <Content>
          <div className='main'>
            <div className='main-center'>
              {props.children}
            </div>
          </div>
          <Footer />
        </Content>
      </Layout>
    </ConfigProvider>
  </HTML>;
}

export default LayoutComponent;