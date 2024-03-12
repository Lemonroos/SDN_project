import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { formatNumber, formatCurrency } from "../Config/utils";
const UnitPrice = () => {
  const [constructionTypes, setConstructionTypes] = useState([]);
  const [constructionItems, setConstructionItems] = useState([]);
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
    getConstructionTypes();
    getConstructionItems();
  }, []);

  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Type",
  //     dataIndex: "packageType",
  //     key: "packageType",
  //   },
  //   {
  //     title: "Value",
  //     dataIndex: "value",
  //     key: "value",
  //   },
  // ];
  console.log(constructionTypes);
  console.log(constructionItems);
  const packageTypes = [
    ...new Set(constructionTypes.map((item) => item.packageType)),
  ];

  // Create columns dynamically based on package types
  const columnsTypes = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Package Type",
      dataIndex: "packageType",
      key: "packageType",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => `${formatNumber(value)} ₫/m²`,
    },
    // ...packageTypes.map(type => ({
    //   title: type.toString(),
    //   dataIndex: 'value',
    //   key: 'value' + type,
    //   render: (value, record) => record.packageType === type ? `${value} ₫` : '-',
    // })),
  ];

  const columnsItems = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Package Type",
      dataIndex: "packageType",
      key: "packageType",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => `${value} ₫`,
    },
  ];

  return (
    <div style={{ backgroundColor: "#f0f2f5", padding: "20px" }}>
      <h2>Construction Types</h2>
      <Table
        columns={columnsTypes}
        dataSource={constructionTypes}
        pagination={false}
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      />
      <h2>Construction Items</h2>
      <Table
        columns={columnsItems}
        dataSource={constructionItems}
        pagination={false}
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      />
    </div>
  );
};

export default UnitPrice;
