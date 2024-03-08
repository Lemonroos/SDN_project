import React from 'react';
import { Typography, Divider, Row, Col, Space, Button } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ContactPage = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Title level={1}>Get in Touch</Title>
      <Title level={4} type="secondary">We're here to help you!</Title>
      <Divider />
      <Row justify="center">
        <Col span={12}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Neely-Sieber_House%2C_front.jpg/1200px-Neely-Sieber_House%2C_front.jpg" alt="Neely-Sieber House" style={{ maxWidth: '100%' }} />
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} sm={12} lg={8}>
          <EnvironmentOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
          <Title level={3}>Location</Title>
          <Text>123 Main Street, City, Country</Text>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <PhoneOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
          <Title level={3}>Phone</Title>
          <Text>+1 (123) 456-7890</Text>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <MailOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
          <Title level={3}>Email</Title>
          <Text>info@example.com</Text>
        </Col>
      </Row>
      <Divider />
     
    </div>
  );
};

export default ContactPage;
