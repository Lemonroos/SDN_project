import React, { useState, useEffect } from "react";
import { Descriptions, Card, Table, Button } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import MySpin from "../../Components/UI/spin";
export default function ContractDetail() {
  const { id } = useParams();
  const [contract, setContract] = useState();

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

  const accept = async() => {
    await axios.put(`http://localhost:5000/contracts/${id}`, {status: 1})
    .then((res) => {
      alert(res.data)
      window.location = `/manager/contracts/detail/${id}`
    })
    .catch((error) => {
      alert(error.data);
    });
  }
  const decline = async() => {
    await axios.put(`http://localhost:5000/contracts/${id}`, {status: 3})
    .then((res) => {
      alert(res.data)
      window.location = `/manager/contracts/detail/${id}`
    })
    .catch((error) => {
      alert(error.data)
    })
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
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Item cost",
      dataIndex: "itemCost",
      key: "itemCost",
    },
  ];
  if (!contract) {
    return <MySpin />;
  }
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
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
          <Descriptions.Item label="Area to Build">
            {contract.quote.project.area}
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
        />
      </Card>
      <Card title="Quote">
        <Descriptions>
          <Descriptions.Item label="Project Package Cost">
            {contract.quote.project.totalItemsCost}
          </Descriptions.Item>
          <Descriptions.Item label="Project Total Items Cost">
            {contract.quote.project.packageCost}
          </Descriptions.Item>
          <Descriptions.Item label="Quote Total">
            {contract.quote.total}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="Status">
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
      {contract.status === 2 && (
        <>
      <Button success onClick={accept}>Accept</Button>
      <Button danger onClick={decline}>Decline</Button>
        </>
      )}
    </div>
  );
}
// import React from "react";

// export default function ContractDetail() {
//   return <div>ContractDetail</div>;
// }
