import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Descriptions, Card, List, Divider, Table, Button } from "antd";
import MySpin from "../../Components/UI/spin";
import { formatNumber, formatCurrency } from "../../Config/utils";
export default function MyContractDetail() {
  const { id } = useParams();
  const [contract, setContract] = useState();

  useEffect(() => {
    const getContract = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/contracts/${id}`
        );
        setContract(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getContract();
  }, [id]);

  if (!contract) {
    return <MySpin />;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: ["constructionItem", "name"],
      key: ["constructionItem", "name"],
    },
    {
      title: "Value",
      dataIndex: ["constructionItem", "value"],
      key: ["constructionItem", "value"],
      render: (value) => `${formatNumber(value)} ₫/item`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (value) => `${formatNumber(value)} item(s)`,
    },
    {
      title: "Item cost",
      dataIndex: "itemCost",
      key: "itemCost",
      render: (itemCost) => `${formatCurrency(itemCost)} `,
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Link to={`/projects/detail/${contract.quote.project._id}`}>
        <Button type="primary" style={{ marginBottom: "10px" }}>
          View project detail
        </Button>
      </Link>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Contract Detail
      </h1>

      <Card title="User Information" style={{ marginBottom: "20px" }}>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Name">
            {contract.user.name}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {contract.user.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {contract.user.email}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Project Information" style={{ marginBottom: "20px" }}>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Project Name">
            {contract.quote.project.name}
          </Descriptions.Item>
          <Descriptions.Item label="Area to Build(m²)">
            {formatNumber(contract.quote.project.area)}
          </Descriptions.Item>
          <Descriptions.Item label="Number of Floors">
            {contract.quote.project.floors}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Construction Items" style={{ marginBottom: "20px" }}>
        <Table
          columns={columns}
          dataSource={contract.quote.project.constructionItemsOrder}
          pagination={false}
        />
      </Card>

      <Card title="Quote" style={{ marginBottom: "20px" }}>
        <Descriptions>
          <Descriptions.Item label="Project Package Cost">
            {formatCurrency(contract.quote.project.totalItemsCost)}
          </Descriptions.Item>
          <Descriptions.Item label="Project Total Items Cost">
            {formatCurrency(contract.quote.project.packageCost)}
          </Descriptions.Item>
          <Descriptions.Item label="Quote Total">
            {formatCurrency(contract.quote.total)}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Status" style={{ marginBottom: "20px" }}>
        <Descriptions>
          <Descriptions.Item label="Contract Status">
            {contract.status === 2
              ? "Pending"
              : contract.status === 1
              ? "Approved"
              : "Rejected"}
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
              <div>Quantity: {formatNumber(item.quantity)} item(s)/</div>
              <div style={{ margin: "10px" }}>Item Cost: {formatCurrency(item.itemCost)}</div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
