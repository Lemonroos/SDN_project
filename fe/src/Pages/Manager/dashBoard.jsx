import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from 'antd';

export default function Dashboard() {
  const [constructionTypes, setConstructionTypes] = useState([]);
  const [constructionItems, setConstructionItems] = useState([]);
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const getConstructionTypes = async () => {
      await axios
        .get("http://localhost:5000/construction_types")
        .then((res) => {
          setConstructionTypes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getConstructionItems = async () => {
      await axios
        .get("http://localhost:5000/construction_items")
        .then((res) => {
          setConstructionItems(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getQuotes = async () => {
      await axios
        .get("http://localhost:5000/quotes")
        .then((res) => {
          setQuotes(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getConstructionTypes();
    getConstructionItems();
    getQuotes()
  }, []);

  const columnsTypes = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Package Type',
      dataIndex: 'packageType',
      key: 'packageType',
      render: (packageType) => {
        if(packageType === 1) return <p>Rough</p>
        return <p>Finish</p>
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value) => `${value} ₫`,
    },
  ];





  const columnsItems = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Package Type',
      dataIndex: 'packageType',
      key: 'packageType',
      render: (packageType) => {
        if(packageType === 1) return <p>Rough</p>
        return <p>Finish</p>
      },
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value) => `${value} ₫`,
    },
  ];

  const columnsQuotes = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Project Name',
      dataIndex: ['project','name'],
      key: ['project','name'],
    },
    {
      title: 'Location',
      dataIndex: ['project','location'],
      key: ['project','location'],
    },
    {
      title: 'Package Cost',
      dataIndex: ['project','packageCost'],
      key: ['project','packageCost'],
      render: (value) => `${value} ₫`,
    },
    {
      title: 'Item Cost',
      dataIndex: ['project','totalItemsCost'],
      key: ['project','totalItemsCost'],
      render: (value) => `${value} ₫`,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (value) => `${value} ₫`,
    },
  ];


  return (
    <div style={{ backgroundColor: '#f0f2f5', padding: '20px' }}>
    <h2>Construction Types</h2>
    <Table 
      columns={columnsTypes} 
      dataSource={constructionTypes} 
      pagination={false}
      style={{ backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px' }}
    />
    <h2>Construction Items</h2>
    <Table 
      columns={columnsItems} 
      dataSource={constructionItems} 
      pagination={false}
      style={{ backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px' }}
    />
    <h2>Quotes</h2>
    <Table 
      columns={columnsQuotes} 
      dataSource={quotes} 
      pagination={false}
      style={{ backgroundColor: 'white', borderRadius: '5px', marginBottom: '20px' }}
    />
  </div>
  );
};

