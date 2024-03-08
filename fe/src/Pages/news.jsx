import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

const News = () => {
  const newsData = [
    {
      id: 1,
      title: 'Breaking News: New Feature Released!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: 'March 1, 2024',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Neely-Sieber_House%2C_front.jpg/1200px-Neely-Sieber_House%2C_front.jpg',
    },
    {
      id: 2,
      title: 'Upcoming Event: Home Decor Workshop',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: 'March 5, 2024',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Neely-Sieber_House%2C_front.jpg/1200px-Neely-Sieber_House%2C_front.jpg',
    },
    {
      id: 3,
      title: 'Tips & Tricks: 10 Easy DIY Projects for Your Kitchen',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: 'March 10, 2024',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Neely-Sieber_House%2C_front.jpg/1200px-Neely-Sieber_House%2C_front.jpg',
    },
  ];

  return (
    <div style={{ padding: '50px' }}>
      <Title level={2}>Latest News</Title>
      <Row gutter={[16, 16]}>
        {newsData.map(newsItem => (
          <Col key={newsItem.id} xs={24} sm={12} lg={8}>
            <Card
              title={newsItem.title}
              extra={<Text type="secondary">{newsItem.date}</Text>}
              cover={<img alt={newsItem.title} src={newsItem.imageUrl} />}
            >
              <p>{newsItem.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
