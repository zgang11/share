import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Divider, message } from "antd";
import "./index.css";
import LogoIcon from "../../asset/images/logo.svg";
import { register, login } from "../../utils/api";

const UserModal = (props) => {
  const [form] = Form.useForm();
  const [type, setType] = useState();
  const [isOpen, setIsOpen] = useState(null);

  const onFinish = () => {
    const params = form.getFieldsValue();
    if (type === "login") {
      login(params).then((res) => {
        if (res.code === 1000) {
          sessionStorage.setItem('token', res.data.token);
          message.success(res.msg);
          setIsOpen(null);
          props.setIsModalOpen(false);
          setTimeout(() => {
            console.log(sessionStorage.getItem('token'))
            props.getDetail();
          }, 0)
        } else {
          message.error(res.msg);
        }
      });
    } else {
      register(params).then((res) => {
        if (res.code === 1000) {
          message.success(res.msg);
          setType("login");
          form.resetFields();
        } else {
          message.error(res.msg);
        }
      });
    }
  };

  const handleCancel = () => {
    reset();
    setIsOpen(null);
    props.setIsModalOpen(false);
  };

  const reset = () => {
    form.resetFields();
  };

  useEffect(() => {
    setIsOpen(props.isModalOpen);
    setType(props.type);
  }, [props.isModalOpen, props.type]);

  return (
    <Modal open={isOpen} footer={null} closable={false} onCancel={handleCancel}>
      <div className="logo-wrapper">
        <img className="img-wrapper" src={LogoIcon} />
        <span className="logo-text-zh">分享</span>
        <span className="logo-text">·Share</span>
      </div>
      <div className="user-modal">
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          style={{ width: "80%" }}
        >
          <Form.Item
            label=""
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input size="large" placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label=""
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item label={null}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              {type === "login" ? "登录" : "注册"}
            </Button>
          </Form.Item>
          <Divider
            variant="dotted"
            style={{
              borderColor: "#1890ff",
            }}
          />
          <span style={{ color: "#9199a1"}}>{type === "login" ? "还没有账号" : "已有账号"}？</span>
          {
            <span
              onClick={() => {setType(type === "login" ? "register" : "login"); reset()}}
              style={{ cursor: "pointer" }}
            >
              {type === "login" ? "注册" : "登录"}
            </span>
          }
          <br />
          <br />
        </Form>
      </div>
    </Modal>
  );
};

export default UserModal;
