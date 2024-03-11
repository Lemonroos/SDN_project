import React, {useState, useEffect} from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Space, Select, List } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
const UpdateProject = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const {Option} = Select
  const [constructionTypes, setConstructionTypes] = useState([])
  const [constructionItems, setConstructionItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    const getContructionTypes = async() => {
      await axios.get('http://localhost:5000/construction_types')
      .then((res) => {
        setConstructionTypes(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    const getConstructionItems = async() => {
      await axios.get('http://localhost:5000/construction_items')
      .then((res) => {
        setConstructionItems(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    const getProjectById = async() => {
      axios.get(`http://localhost:5000/projects/${id}`)
      .then(res => {
        form.setFieldsValue({
          ...res.data,
          startDate: moment(res.data.startDate),
          constructionItemsOrder: res.data.constructionItemsOrder.map(item => ({
            ...item,
            constructionItem: item.constructionItem._id
          }))
        });
      })
      .catch(err => console.error(err));
    }
    getContructionTypes();
    getConstructionItems();
    getProjectById();
  }, [])
  const handleSelectChange = (value, name) => {
    setSelectedItems(prevState => [...prevState, value]);
  };

  const handleRemove = (name) => {
    setSelectedItems(prevState => prevState.filter(item => item !== name));
  };
  const onFinish = (values) => {
    axios.put(`http://localhost:5000/projects/${id}`, values, {withCredentials: true})
    .then((res) => {
      const id = res.data._id
      alert('Updated successfully')
      window.location = (`/quote/${id}`)
    })
    .catch((error) => {
      alert(error.response)
    })
  };

  return (
    <Form name="dynamic_form_nest_item" form={form} onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Missing name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="image"
        label="Image"
        rules={[{ required: true, message: 'Missing image' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: 'Missing location' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="area"
        label="Area"
        rules={[{ required: true, message: 'Missing area' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="floors"
        label="Floors"
        rules={[{ required: true, message: 'Missing floors' }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="startDate"
        label="Start Date"
        rules={[{ required: true, message: 'Missing start date' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item name="constructionType" label="Construction Type" rules={[{ required: true }]}>
        <Select placeholder="Select a construction type">
          {constructionTypes.map(type => (
            <Option key={type._id} value={type._id}>{type.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.List name="constructionItemsOrder">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Form.Item key={field.key}>
                <Form.Item
                  {...field}
                  name={[field.name, 'constructionItem']}
                  fieldKey={[field.fieldKey, 'constructionItem']}
                  rules={[{ required: true, message: 'Select a construction item' }]}
                >
                  <Select placeholder="Select a construction item">
                    {constructionItems.map(item => (
                      <Option key={item._id} value={item._id}>{item.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'quantity']}
                  fieldKey={[field.fieldKey, 'quantity']}
                  rules={[{ required: true, message: 'Enter a quantity' }]}
                >
                  <Input type="number" placeholder="Quantity" />
                </Form.Item>
              <Button onClick={() => remove(field.name)}>Remove</Button>
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>Add Construction Item</Button>
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

export default UpdateProject;
