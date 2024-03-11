import React from "react";
import { Descriptions, Card, Table } from "antd";

export default function ContractDetail() {
  // Sample user and contract data
  const user = {
    name: "John Doe",
    phone: "123-456-7890",
    email: "johndoe@example.com",
  };

  const contract = {
    id: "123",
    construction: "Building A",
    area: "500 sqm",
    floors: "2",
    items: [
      { id: "1", name: "Rebars", quantity: "100" },
      { id: "2", name: "Sands", quantity: "200" },
      // More items here...
    ],
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
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
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Contract Detail
      </h1>
      <Card title="User Information" style={{ marginBottom: "20px" }}>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="Contract Information" style={{ marginBottom: "20px" }}>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Construction Name">
            {contract.construction}
          </Descriptions.Item>
          <Descriptions.Item label="Area to Build">
            {contract.area}
          </Descriptions.Item>
          <Descriptions.Item label="Number of Floors">
            {contract.floors}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="Construction Items">
        <Table columns={columns} dataSource={contract.items} />
      </Card>
    </div>
  );
}
// import React from "react";

// export default function ContractDetail() {
//   return <div>ContractDetail</div>;
// }
