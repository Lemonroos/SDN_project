import React, { useEffect, useState } from "react";
import { Table, Space ,Button} from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MySpin from "../../Components/UI/spin";
export default function Contracts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5000/contracts');
      setData(result.data);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Project Name',
      dataIndex: ['quote','project','name'],
      key: ['quote','project','name'],
    },
    {
      title: 'User Name',
      dataIndex: 'user',
      key: 'name',
      render: user => user.name,
    },
    {
      title: 'Total',
      dataIndex: 'quote',
      key: 'total',
      render: quote => quote.total,
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
      title: 'View',
      key: 'view',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/manager/contracts/detail/${record._id}`}>
            <Button type="primary">
              View
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
  if (!data.length) {
    return <MySpin />;
  }
  return <Table columns={columns} dataSource={data} />;
}
