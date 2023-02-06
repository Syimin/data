import React, { useState, useEffect} from "react";
import { Button, message, Card, Row, Col, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Uploadp = () => {
  const [users, setUsers] = useState([]);
  const [filelist, setFilelist] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users");
      const result = await res.json();
      if (res.ok) {
        setUsers(result.data);
      } else {
        message.warning(result.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };


  const register = async (body) => {
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      if (res.ok) {
        message.success(result.message);
      } else {
        message.warning(result.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = (values) => {
    const { username } = values;
    const body = { username, filelist};
    register(body);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const upload = (info) => {
    const fl = info.fileList.map((f, idx) => {
      if (f.response) {
        return f.response.data;
      }
    });
    setFilelist(fl);
  };  

  return (
    //HTML部分
      
      <Form name="basic" onFinish={onFinish}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Upload
          name="pictures"
          action="http://localhost:3000/api/upload"
          onChange={upload}
        >
          <Button>
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
  );
};
export default Uploadp
