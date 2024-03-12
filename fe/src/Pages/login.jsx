import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Card,Alert } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { message } from 'antd';

const Login = () => {
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate()
  const onFinish = async (values) => {
    setLoading(true);
    // Here you can add your login logic
    // For example, you can make an API call to authenticate the user
    await axios.post('http://localhost:5000/auth/user/signin', values, {withCredentials: true})
    .then((res) => {
      if(res.data.role === 'Manager'){
        message.success('Login successfully');
        window.location = '/manager'
      }
      else{
        message.success('Login successfully');
        window.location = '/'
      }
    })
    .catch((error) => {
      message.error(error.response.data)
    })
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* <Alert message="Success Text" type="success" /> */}
       <Card >
       <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#333' }}>Welcome</h2>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{ width: 300 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
        <div style={{ textAlign: 'center' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </Form>
      </Card>
    </div>
  );
};

export default Login;
