import React, { useMemo, useRef, useEffect, useState } from "react";
import "./index.css";
import HTML from "component/layout";
import { Button, Form, Input, Select, Space, InputNumber, Upload, message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateEbook } from "../../utils/api";
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 21,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 3,
    span: 21,
  },
};

const CreateVideo = ({ defaultContent = "", ebook }) => {
  const [form] = Form.useForm();
  const [content, setContent] = React.useState(defaultContent);
  const quillRef = useRef(null);
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      // status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const props = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    maxCount: 1,
    accept:"image/jpg, image/png",
    onChange({ file, fileList }) {
      setFileList(fileList);
      console.log(file);
      if(file.status === 'removed'){ 
        form.setFieldsValue({
          cover: ''
        })
      }
      if (file.status === 'done') {
        const { response } = file;
        const { data } = response;
        fileList[0].url = data.url
        
        setFileList(fileList);
        form.setFieldsValue({
          cover: data.url
        })
      } else if (file.status === 'error') {
        message.error('上传失败');
      }
    },
  };

  useEffect(() => {
    setContent(ebook.content);
    setFileList([{
      uid: '-1',
      name: ebook.cover,
      // status: 'done',
      url: ebook.cover
    }]);
    form.setFieldsValue(ebook);
  }, [defaultContent]);

  const handleImageUpload = () => {
    if (!document) return;
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const { data } = await response.json();
        const range = quillRef.current.getEditor().getSelection();
        quillRef.current
          .getEditor()
          .insertEmbed(range.index, "image", data.url);
        quillRef.current.getEditor().setSelection(range.index + 1);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
        ["blockquote", "code-block"], // 引用  代码块
        [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
        [{ indent: "-1" }, { indent: "+1" }], // 缩进
        [{ size: ["small", false, "large", "huge"] }], // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
        [{ align: [] }], // 对齐方式
        ["clean"], // 清除文本格式
        ["link"], // 链接、图片、视频
      ],
    },
  }));

  function setQuillRef(r) {
    quillRef.current = r;
    if (r) {
      r.getEditor().getModule("toolbar").handlers.image = handleImageUpload;
    }
  }

  const handleChange = (content) => {
    setContent(content);
  };

  const onFinish = (values) => {
    const body = {
      ...values,
      content,
      id: ebook.id
    };
    updateEbook(body).then((res) => {
      if (res.code === 1000) {
        location.reload()
      }
    });
  };
  const onReset = () => {
    form.setFieldsValue(ebook);
  };

  return (
    <HTML>
      <div className="videoWrapper">
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{
            maxWidth: 900,
            width: "100%",
          }}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: "请输入标题",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="cover"
            label="封面"
            rules={[
              {
                required: true,
                message: "请上传封面",
              },
            ]}
          >
            <Upload {...props} fileList={fileList}>
              <Button icon={<UploadOutlined />}>上传封面</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="type"
            label="视频类型"
            rules={[
              {
                required: true,
                message: "请选择视频类型",
              },
            ]}
          >
            <Select
              placeholder="请输入标题"
              allowClear
              size="large"
            >
              <Option value="1">javascript</Option>
              <Option value="2">css</Option>
              <Option value="3">html</Option>
              <Option value="4">Vue</Option>
              <Option value="5">React</Option>
              <Option value="6">python</Option>
              <Option value="7">go</Option>
              <Option value="8">java</Option>
              <Option value="9">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item name="author" label="作者">
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="keywords"
            label="关键字"
            placeholder="请输入关键字，以逗号分隔"
            rules={[
              {
                required: true,
                message: "请输入关键字",
              },
            ]}
          >
            <Input.TextArea size="large" rows={2} />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            placeholder="请输入描述"
          >
            <Input.TextArea size="large" rows={4} />
          </Form.Item>
          <Form.Item
            name="url"
            label="视频链接"
            placeholder="请输入链接"
            rules={[
              {
                required: true,
                message: "请输入链接",
              },
            ]}
          >
            <Input.TextArea size="large" rows={2} />
          </Form.Item>
          <Form.Item
            name="code"
            label="提取码"
            placeholder="请输入提取码"
            rules={[
              {
                required: true,
                message: "请输入链接",
              },
            ]}
          >
            <Input.TextArea size="large" rows={2} />
          </Form.Item>
          <Form.Item
            name="price"
            label="价格"
            placeholder="请输入价格"
          >
            <InputNumber size="large" />
          </Form.Item>
          <Form.Item name="content" label="内容" placeholder="请输入内容">
            <ReactQuill 
              ref={setQuillRef}
              bounds={document.body}
              modules={modules}
              value={content}
              onChange={handleChange}
              theme="snow"
              placeholder="请输入内容"
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" size="large" htmlType="submit">
                提交
              </Button>
              <Button htmlType="button" size="large" onClick={onReset}>
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </HTML>
  );
};

export default CreateVideo;
