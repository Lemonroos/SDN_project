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
    <>
      <Layout className="">
        <Content style={{ padding: "0 50px" }}>
          <Carousel
            autoplay
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              height: "700px",
              paddingTop: "90px",
              background: "#404040",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <img
                src="https://i.pinimg.com/originals/bb/7a/00/bb7a00b1cdccd419d6bad81cc2707669.jpg"
                alt="Civil Housing"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <img
                src="https://imageio.forbes.com/specials-images/imageserve/646e0654ec259052a78e4343/townhome/960x0.jpg?format=jpg&width=1440"
                alt="Civil Housing"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  textAlign: "center",
                }}
              />
            </div>
            {/* Add more images as needed */}
          </Carousel>

          <div className="site-layout-content">
            <Title>Welcome to Civil Housing</Title>
            <Paragraph>
              {introExpanded
                ? `"Welcome to Civil Housing, a pioneering initiative aimed at redefining urban living. Our mission is to create sustainable, affordable, and community-focused living spaces that cater to the diverse needs of our residents. 

                We envision a future where everyone has access to comfortable and environmentally friendly housing. Our values are deeply rooted in sustainability, inclusivity, and innovation. We strive to incorporate green building practices, promote social inclusion, and leverage cutting-edge technology to make our vision a reality.
                
                Our key objectives include developing energy-efficient buildings, fostering strong community ties, and making housing accessible to people from all walks of life. Join us as we work towards transforming the urban landscape and improving the quality of life for our residents.`
                : `Welcome to Civil Housing, a project dedicated to creating sustainable, affordable, and community-focused living spaces.`}

              <Button type="link" onClick={toggleIntro}>
                {introExpanded ? "Read Less" : "Read More"}
              </Button>
            </Paragraph>

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
          Civil Housing ©2024
        </Footer>
      </Layout>
    </>
  );
};

export default Home;
