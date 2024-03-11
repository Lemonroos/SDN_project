import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'
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
        alert('Login successfully')
        window.location = '/manager'
      }
      else{
        alert('Login successsfully')
        window.location = '/'
      }
    })
    .catch((error) => {
      alert(error.response.data)
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
    </div>
  );
};

export default Login;
