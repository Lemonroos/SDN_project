import React, { useState } from "react";
import { Layout, Carousel, Typography, Button, Row, Col, Card } from "antd";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  const [introExpanded, setIntroExpanded] = useState(false);

  const toggleIntro = () => {
    setIntroExpanded(!introExpanded);
  };

  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <Carousel autoplay style={{ display: 'flex', justifyContent: 'center' }}>
          <div>
            <img
              src="https://i.pinimg.com/originals/bb/7a/00/bb7a00b1cdccd419d6bad81cc2707669.jpg"
              alt="Civil Housing"
              style={{ width: "800px", height: "400px", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://i.pinimg.com/originals/bb/7a/00/bb7a00b1cdccd419d6bad81cc2707669.jpg"
              alt="Civil Housing"
              style={{ width: "800px", height: "400px", objectFit: "cover" }}
            />
          </div>
          {/* Add more images as needed */}
        </Carousel>

        <div className="site-layout-content">
          <Title>Welcome to Civil Housing</Title>
          <Paragraph>
            {introExpanded
              ? `Long introduction text goes here. This text can be several paragraphs long and should provide a comprehensive overview of the civil housing project. It can include the mission, vision, values, and key objectives of the project.`
              : `Long introduction text goes here...`}
            <Button type="link" onClick={toggleIntro}>
              {introExpanded ? "Read Less" : "Read More"}
            </Button>
          </Paragraph>

          <Title level={2}>Meet the Creators</Title>
          <Carousel dots={false} autoplay>
            <div>
              <img
                src="https://media.licdn.com/dms/image/D4E03AQFaljxqA7pFRQ/profile-displayphoto-shrink_800_800/0/1686647371933?e=2147483647&v=beta&t=RbNTbQLUsJUVP439M8jKxI8gM6tF3WEOJ3BCkYGHzEk"
                alt="Creator"
              />
            </div>
            <div>
              <img
                src="https://media.licdn.com/dms/image/D4E03AQFaljxqA7pFRQ/profile-displayphoto-shrink_800_800/0/1686647371933?e=2147483647&v=beta&t=RbNTbQLUsJUVP439M8jKxI8gM6tF3WEOJ3BCkYGHzEk"
                alt="Creator"
              />
            </div>
            {/* Add more creator images as needed */}
          </Carousel>
          <Title level={2}>Customer Reviews</Title>
          <Carousel autoplay>
            <Card title="John Doe">
              <p>"This is the best housing project I have ever seen!"</p>
            </Card>
            <Card title="Jane Smith">
              <p>"The community and support are outstanding!"</p>
            </Card>
            {/* Add more reviews as needed */}
          </Carousel>
          <Title level={2}>Why Choose Us?</Title>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Quality" bordered={false}>
                We provide the highest quality housing...
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Community" bordered={false}>
                Join an ever-growing, vibrant community...
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Support" bordered={false}>
                Our support team is here for you 24/7...
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <Row>
          <Col span={8}>
            <Title level={4}>Contact Us</Title>
            <p>123 Housing Lane</p>
            <p>City, State, Zip</p>
          </Col>
          <Col span={8}>
            <Title level={4}>Policies</Title>
            {/* List policies here */}
          </Col>
          <Col span={8}>
            <Title level={4}>Stay Connected</Title>
            {/* Social media links */}
          </Col>
        </Row>
        Civil Housing ©2024 Created by You
      </Footer>
    </Layout>
  );
};

export default Home;
