import React from "react";
import { useState } from "react";
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar } from 'antd';
import { logout } from '../../utils/api';

function HeaderComponent(props) {
  const [open, setOpen] = useState(false);
  const handleMenuClick = (e) => {
    if (e.key === '1') {
      logOut_();
      // setOpen(false);
    }
  };
  const handleOpenChange = (flag) => {
    setOpen(flag);
  };
  const items = [
    {
      label: '退出登录',
      key: '1',
    },
  ];

  const logOut_ = async () => {
    // props.refeshLoginStatus();
    const result = await logout();
    if(result.code === 1000) {
      props.refeshLoginStatus();
    }
  }

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      arrow={{ pointAtCenter: true }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size="small" style={{ backgroundColor: '#00b96b' }} icon={<UserOutlined />} />
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}

export default HeaderComponent;
