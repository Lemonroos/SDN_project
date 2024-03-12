import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Space,
  Select,
  List,
  Row,
  Col,
  Card,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
const CreateProject = () => {
  const { Option } = Select;
  const [constructionTypes, setConstructionTypes] = useState([]);
  const [constructionItems, setConstructionItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    const getContructionTypes = async () => {
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
    getContructionTypes();
    getConstructionItems();
  }, []);
  const handleSelectChange = (value, name) => {
    setSelectedItems((prevState) => [...prevState, value]);
  };
  const handleRemove = (name) => {
    setSelectedItems((prevState) => prevState.filter((item) => item !== name));
  };
  const onFinish = (values) => {
    console.log("Received values of form:", values);
    axios
      .post("http://localhost:5000/projects", values, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        const id = res.data._id;
        message.success("Created successfully");
        window.location = `/quote/${id}`;
      })
      .catch((error) => {
        message.error(error.response);
      });
  };
  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      autoComplete="off"
      labelCol={{ span: 3 }}
      labelAlign="left"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Missing name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="image"
        label="Image"
        rules={[{ required: true, message: "Missing image" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: "Missing location" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="area"
        label="Area(m²)"
        rules={[
          { required: true, message: "Missing area" },
          { type: "number", min: 0, message: "Area cannot be negative" },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="floors"
        label="Floors"
        rules={[
          { required: true, message: "Missing floor" },
          {
            type: "number",
            min: 1,
            message: "Floor cannot be smalller than 1",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[
          { required: true, message: "Missing start date" },
          {
            validator: (_, value) =>
              value && value.isBefore(moment().startOf("day"))
                ? Promise.reject("Start date cannot be in the past")
                : Promise.resolve(),
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="constructionType"
        label="Construction Type"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select a construction type">
          {constructionTypes.map((type) => (
            <Option key={type._id} value={type._id}>
              {type.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.List name="constructionItemsOrder">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Form.Item key={field.key}>
                <Form.Item
                  {...field}
                  name={[field.name, "constructionItem"]}
                  fieldKey={[field.fieldKey, "constructionItem"]}
                  rules={[
                    { required: true, message: "Select a construction item" },
                  ]}
                >
                  <Select placeholder="Select a construction item">
                    {constructionItems.map((item) => (
                      <Option key={item._id} value={item._id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "quantity"]}
                  fieldKey={[field.fieldKey, "quantity"]}
                  rules={[
                    { required: true, message: "Enter a quantity" },
                    {
                      validator: (_, value) =>
                        value < 0
                          ? Promise.reject("Quantity cannot be negative")
                          : value ===0? Promise.reject("Quantity cannot be zero"):
                          Promise.resolve(),
                    },
                  ]}
                >
                  <InputNumber placeholder="Quantity" />
                </Form.Item>

                <Button onClick={() => remove(field.name)}>Remove</Button>
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Add Construction Item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProject;
