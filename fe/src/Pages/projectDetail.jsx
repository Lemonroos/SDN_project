import React, { useState, useEffect } from 'react';
import { Card, Button, Space, Descriptions, Statistic, List, Divider } from 'antd';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import MySpin from "../Components/UI/spin";
export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`http://localhost:5000/projects/${id}`)
        .then((res) => {
          setProject(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProject();
  }, [id]);

  if (!project) {
    return <MySpin />;
  }

  return (
    <div style={{ padding: '200px', paddingTop: '60px', paddingBottom: '60px' }}>
      <Space style={{ marginBottom: '20px' }}>
        <Link to="/projects">
          <Button type="primary">Back</Button>
        </Link>
      </Space>
      <Card
        cover={<img alt={project.name} src={project.image} />}
        style={{ marginBottom: '20px' }}
      >
        <Descriptions title={project.name}>
          <Descriptions.Item label="Location">{project.location}</Descriptions.Item>
          <Descriptions.Item label="Area">{project.area}</Descriptions.Item>
          <Descriptions.Item label="Floors">{project.floors}</Descriptions.Item>
          <Descriptions.Item label="Start Date">{new Date(project.startDate).toLocaleDateString()}</Descriptions.Item>
          <Descriptions.Item label="Status">{project.status ? 'Active' : 'Inactive'}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Divider />
      <Card>
        <Statistic title="Package Cost" value={project.packageCost} style={{ margin: '20px' }} />
        <Statistic title="Total Items Cost" value={project.totalItemsCost} style={{ margin: '20px' }} />
      </Card>
      <Divider />
      <Card>

     
      <h3>Construction Items Order:</h3>
      <List
        itemLayout="horizontal"
        dataSource={project.constructionItemsOrder}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={`Item ${index + 1}: ${item.constructionItem.name}`}
              description={item.constructionItem.description}
            />
            <div>Quantity: {item.quantity}</div>
            <div  style={{ margin: '10px' }}>Item Cost: {item.itemCost}</div>
          </List.Item>
        )}
      />
       </Card>
    </div>
  );
}
