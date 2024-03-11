import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Descriptions, Card, List, Button, Divider } from "antd";
import MySpin from "../../Components/UI/spin";

export default function MyContractDetail() {
  const [contract, setContract] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getContract = async () => {
      await axios
        .get(`http://localhost:5000/contracts/${id}`)
        .then((res) => {
          setContract(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getContract();
  }, [id]);
  console.log(contract);
  if (!contract) {
    return <MySpin />;
  }

  return (
    <div
      style={{ padding: "200px", paddingTop: "60px", paddingBottom: "60px" }}
    >
      <Link to={`/projects/detail/${contract.quote.project._id}`}>
        <Button type="primary" style={{ marginBottom: "10px" }}>
          View project detail{" "}
        </Button>
      </Link>
      <Card title={contract.quote.project.name}>
        <Descriptions column={1}>
          <Descriptions.Item>
            <img
              src={contract.quote.project.image}
              alt="Project"
              style={{ width: "100%" }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="User Name">
            {contract.user.name}
          </Descriptions.Item>
          <Descriptions.Item label="User Email">
            {contract.user.email}
          </Descriptions.Item>
          <Descriptions.Item label="User Phone">
            {contract.user.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Project Area">
            {contract.quote.project.area}
          </Descriptions.Item>
          <Descriptions.Item label="Project Floors">
            {contract.quote.project.floors}
          </Descriptions.Item>
          <Descriptions.Item label="Construction Type">
            {contract.quote.project.constructionType.name}
          </Descriptions.Item>
          <Descriptions.Item label="Package Type">
            {contract.quote.project.constructionType.packageType === 1
              ? "Rough"
              : "Finish"}
          </Descriptions.Item>
          <Descriptions.Item label="Project Location">
            {contract.quote.project.location}
          </Descriptions.Item>
          <Descriptions.Item label="Project Package Cost">
            {contract.quote.project.packageCost}
          </Descriptions.Item>
          <Descriptions.Item label="Project Start Date">
            {new Date(contract.quote.project.startDate).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Project Status">
            {contract.quote.project.status ? "Active" : "Inactive"}
          </Descriptions.Item>
          <Descriptions.Item label="Contract Status">
            {contract.status === 2
              ? "Pending"
              : contract.status === 1
              ? "Approved"
              : "Rejected"}
          </Descriptions.Item>
          <Descriptions.Item label="Project Total Items Cost">
            {contract.quote.project.totalItemsCost}
          </Descriptions.Item>
          <Descriptions.Item label="Quote Total">
            {contract.quote.total}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Divider />
      <Card>
        <h3>Construction Items Order:</h3>
        <List
          itemLayout="horizontal"
          dataSource={contract.quote.project.constructionItemsOrder}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={`Item ${index + 1}: ${item.constructionItem.name}`}
                description={item.constructionItem.description}
              />
              <div>Quantity: {item.quantity}</div>
              <div style={{ margin: "10px" }}>Item Cost: {item.itemCost}</div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
