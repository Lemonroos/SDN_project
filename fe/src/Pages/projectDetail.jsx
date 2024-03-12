import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Space,
  Descriptions,
  Statistic,
  List,
  Divider,
  message,
} from "antd";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MySpin from "../Components/UI/spin";
import { formatCurrency, formatNumber } from "../Config/utils";
export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState();
  const [existContract, setExistContract] = useState(false);

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
    const checkIfProjectIsInContract = async () => {
      await axios
        .get(
          `http://localhost:5000/contracts/check-if-project-exists?projectId=${id}`,
          { withCredentials: true }
        )
        .then((res) => {
          setExistContract(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProject();
    checkIfProjectIsInContract();
  }, [id]);
  console.log(existContract)
  if (!project) {
    return <MySpin />;
  }

  const deleteProject = async () => {
    await axios
      .delete(`http://localhost:5000/projects/${id}`, { withCredentials: true })
      .then((res) => {
        message.success(res.data);
        window.location = "/projects";
      })
      .catch((err) => {
        message.error(err.response.data);
      });
  };
  return (
    <>
      <div
        style={{ padding: "200px", paddingTop: "60px", paddingBottom: "60px" }}
      >
        <Space style={{ marginBottom: "10px" }}>
          <Link to="/projects">
            <Button type="primary">Back</Button>
          </Link>
        </Space>
        <Card
          cover={<img alt={project.name} src={project.image} />}
          style={{ marginBottom: "20px" }}
        >
          <Descriptions title={project.name}>
            <Descriptions.Item label="Location">
              {project.location}
            </Descriptions.Item>
            <Descriptions.Item label="Area(m²)">
              {formatNumber(project.area)}
            </Descriptions.Item>
            <Descriptions.Item label="Floors">
              {project.floors}
            </Descriptions.Item>
            <Descriptions.Item label="Start Date">
              {new Date(project.startDate).toLocaleDateString()}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {project.status ? "Active" : "Inactive"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Divider />
        <Card>
          <Statistic
            title="Package Cost"
            value={formatCurrency(project.packageCost)}
            style={{ margin: "20px" }}
          />
          <Statistic
            title="Total Items Cost"
            value={formatCurrency(project.totalItemsCost)}
            style={{ margin: "20px" }}
          />
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
                <div>Quantity: {formatNumber(item.quantity)}item(s)/</div>
                <div style={{ margin: "10px" }}>
                  Item Cost: {formatCurrency(item.itemCost)}
                </div>
              </List.Item>
            )}
          />
        </Card>
        <Divider />
        {!existContract && (
          <>
            <Link to={`/projects/update/${id}`}>
              <Button type="primary">Update</Button>
            </Link>
            <Button
              style={{ marginLeft: "10px" }}
              danger
              onClick={deleteProject}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </>
  );
}
