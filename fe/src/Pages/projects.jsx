import React, { useState, useEffect } from "react";
import { Card, Button, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import MySpin from "../Components/UI/spin";

const antIcon = <LoadingOutlined style={{ fontSize: "2rem" }} spin />;

export default function DeployedContract() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchUser = async() => {
      await fetch("http://localhost:5000/auth/user/login/success", {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      throw new Error("authentication has been failed!");
    }).then((resObject) => {
      // Return the success status and the user data
      setUser(resObject.user)
    })
    .catch((err) => {
      console.log(err);
    });
    }
    fetchUser()
  }, [])
  const getAllProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects");
      setProjects(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getMyProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/projects/my-projects",
        { withCredentials: true }
      );
      setProjects(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("success")==="true");
    getAllProjects();
  }, []);

  if (!projects) {
    return <MySpin />;
  } else
    return (
      <div style={{ padding: "2%", paddingTop: "6%", paddingBottom: "6%" }}>
        {user && (
          <Space style={{ marginBottom: "1%" }}>
            <Link to="/createProject">
              <Button type="primary">Create New Project</Button>
            </Link>
            <Button type="primary" onClick={getMyProjects}>
              My projects
            </Button>
            <Button type="primary" onClick={getAllProjects}>
              All projects
            </Button>
          </Space>
        )}
        {loading ? (
          <MySpin />
        ) : (
          <Row gutter={[16, 16]}>
            {projects.map((project) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={6} key={project._id}>
                <Link to={`/projects/detail/${project._id}`}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={project.name}
                        src={project.image}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    }
                    style={{ height: "100%" }}
                  >
                    <Card.Meta
                      title={project.name}
                      description={project.location}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
}
