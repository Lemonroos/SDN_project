import React, { useState, useEffect } from "react";
import { Card, Button, Space, Row, Col } from "antd"; 
import { Link } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons"; 
import MySpin from "../Components/UI/spin";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />; 

export default function DeployedContract() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/projects");
        setProjects(res.data);
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };
    getProjects();
  }, []);

  return (
    <div style={{ padding: "20px", paddingTop: "60px", paddingBottom: "60px" }}>
      <Space style={{ marginBottom: "20px" }}>
        <Link to="/createProject">
          <Button type="primary">Create New Projects</Button>
        </Link>
      </Space>
      {loading ? ( 
        <MySpin />
      ) : (
        <Row gutter={16}>
          {projects.map((project) => (
            <Col span={8} key={project._id}>
              <Link to={`/projects/detail/${project._id}`}>
                <Card
                  hoverable
                  cover={<img alt={project.name} src={project.image} />}
                >
                  <Card.Meta title={project.name} description={project.location} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
