import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Space,
  Descriptions,
  Statistic,
  List,
  Divider,
} from "antd";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MySpin from "../../Components/UI/spin";
export default function QuoteDetail() {
  const { id } = useParams();
  const [quote, setQuote] = useState();

  useEffect(() => {
    const getQuote = async () => {
      await axios
        .get(`http://localhost:5000/quotes/${id}`)
        .then((res) => {
          setQuote(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getQuote();
  }, [id]);

  const createContract = async() => {
    await axios.post('http://localhost:5000/contracts', {quote: id}, {withCredentials: true})
    .then((res) => {      
        alert('Create successfully')
        const contractId = res.data._id
        window.location = (`/mycontracts/detail/${contractId}`)
    }
    ).catch((err) => {
      alert(err.response.data)
    })
  }

  if (!quote) {
    return <MySpin />;
  }

  return (
    <div
      style={{ padding: "200px", paddingTop: "60px", paddingBottom: "60px" }}
    >
      <h3>Total:</h3>
      <Card
        cover={<img alt={quote.project.name} src={quote.project.image} />}
        style={{ marginBottom: "20px" }}
      >
        <Descriptions title={quote.project.name}>
          <Descriptions.Item label="Location">
            {quote.project.location}
          </Descriptions.Item>
          <Descriptions.Item label="Area">
            {quote.project.area}
          </Descriptions.Item>
          <Descriptions.Item label="Floors">
            {quote.project.floors}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            {new Date(quote.project.startDate).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {quote.project.status ? "Active" : "Inactive"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Divider />
      <h3>Construction Items Order:</h3>
      <List
        itemLayout="horizontal"
        dataSource={quote.project.constructionItemsOrder}
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
      <Card>
        <Statistic
          title="Package Cost"
          value={quote.project.packageCost}
          style={{ margin: "20px" }}
        />
        <Statistic
          title="Total Items Cost"
          value={quote.project.totalItemsCost}
          style={{ margin: "20px" }}
        />
      </Card>
      <Divider />
      <Card style={{ marginBottom: "20px" }}>
        <Descriptions title={quote.project.name}>
          <Descriptions.Item label="Total">{quote.total}</Descriptions.Item>
        </Descriptions>
      </Card>
      <Button onClick={createContract}>Create Contract</Button>
    </div>
  );
}
