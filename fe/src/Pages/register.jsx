import React, { useState } from "react";
import { Form, Input, Button, Select,Card,message } from "antd";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const { Option } = Select;
 const navigate = useNavigate()
const currentYear = new Date().getFullYear();
const years = Array.from({length: 100}, (_, i) => currentYear - i);
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    setLoading(true);
    // Here you can add your registration logic
    // For example, you can make an API call to register the user
    axios.post('http://localhost:5000/auth/user/register', values)
    .then((res) => {
      message.success(res.data)
      navigate('/login')
    })
    .catch((error) => {
      if (error.response && error.response.data) {
       message.error(error.response.data);
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card>
      <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#333' }}>Welcome</h2>
      <Form
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 300 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="YOB"
          name="YOB"
          rules={[
            { required: true, message: "Please choose a year" },
          ]}
        >
          <Select>
      {years.map(year => <Option key={year} value={year}>{year}</Option>)}
    </Select>
        </Form.Item>
        

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input />
        </Form.Item>

        

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
      </Card>
    </div>
  );
};

export default Register;
