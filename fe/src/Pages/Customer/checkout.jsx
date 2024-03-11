import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Table,
  Modal,
  message,
} from "antd";
import axios from "axios";

const Checkout = () => {
  const [formData, setFormData] = useState({
    // Initialize form data with initial values
  });
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   // Fetch cart items from server or local storage
  //   axios.get("/api/cart")
  //     .then((response) => {
  //       setCartItems(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching cart items:", error);
  //     });
  // }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/checkout", formData);
      // Handle successful checkout response
      message.success("Checkout successful!");
      setIsLoading(false);
      setShowModal(true); // Open confirmation modal
      // Optionally, clear cart and navigate to a confirmation page
    } catch (error) {
      console.error("Checkout error:", error);
      message.error("Something went wrong during checkout.");
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <Card title="Checkout">
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        {/* Personal Information Fields */}
        <Form.Item label="Full Name">
          <Input name="fullName" placeholder="Enter your full name" />
        </Form.Item>
        {/* ...other fields like address, email, phone, etc. */}

        {/* Cart Summary Table */}
        <Table
          dataSource={cartItems}
          columns={[
            { title: "Product Name" },
            { title: "Quantity" },
            { title: "Price" },
          ]}
          bordered
        />

        {/* Checkout Options */}
        <Form.Item name="agree" valuePropName="checked">
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Checkout
          </Button>
        </Form.Item>
      </Form>

      {/* Confirmation Modal */}
      <Modal
        title="Order Confirmed"
        visible={showModal}
        onOk={handleModalClose}
      >
        <p>Thank you for your order! Your order has been placed successfully.</p>
        {/* Optionally display order details or a summary */}
      </Modal>
    </Card>
  );
};

export default Checkout;
