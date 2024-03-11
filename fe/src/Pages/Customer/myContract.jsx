import { React, useEffect, useState } from "react";
import { Table, Button, Space } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
export default function MyContract() {
  const [contracts, setContracts] = useState([]);
  useEffect(() => {
    const getContracts = async () => {
      await axios
        .get("http://localhost:5000/contracts/my-contracts/contracts-by-user", {
          withCredentials: true,
        })
        .then((res) => {
          setContracts(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getContracts();
  }, []);
  const data = contracts;

  const columns = [
    {
      title: "Project Name",
      dataIndex: ["quote", "project", "name"],
      key: "project name",
    },
    {
      title: "Total",
      dataIndex: ["quote", "total"],
      key: "quote.total",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        switch (status) {
          case 1:
            return "Approve";
          case 2:
            return "Pending";
          case 3:
            return "Rejected";
          default:
            return "unknown";
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link to={`/mycontracts/detail/${record._id}`}>
          <Button type="primary">View</Button>
        </Link>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", paddingTop: "60px", paddingBottom: "60px" }}>
      <Space style={{ marginBottom: "20px" }}>
      </Space>
      <Table columns={columns} dataSource={data} pagination={false}/>
    </div>
  );
}
