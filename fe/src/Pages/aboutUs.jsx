import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  return (
    <div style={{ padding: '100px' }}>
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <div style={{ textAlign: 'left' }}>
            <Title>Welcome to HomeTalk</Title>
            <Paragraph>
              HomeTalk is your ultimate destination for all things related to home improvement, interior design, DIY projects,
              and home decor inspiration. Whether you're a seasoned DIY enthusiast or just starting out, HomeTalk has
              everything you need to make your home beautiful and functional.
            </Paragraph>
            <Paragraph>
              Our mission is to empower homeowners with the knowledge and resources to transform their living spaces into
              places they truly love. From expert tips and tutorials to community forums and project galleries, HomeTalk is
              here to guide and inspire you every step of the way.
            </Paragraph>
            <Paragraph>
              Join our community today and start exploring endless possibilities for enhancing your home. Let's turn your
              house into a HomeTalk masterpiece!
            </Paragraph>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ textAlign: 'center' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Neely-Sieber_House%2C_front.jpg/1200px-Neely-Sieber_House%2C_front.jpg" alt="HomeTalk" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
