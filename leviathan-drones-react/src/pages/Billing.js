import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./Billing.css";

function Billing() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "Credit Card",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Billing information submitted!");
    // You can process the form data here, like sending it to an API
  };

  return (
    <Container className="billing-page">
      <h1 className="mb-4">Billing Information</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formPaymentMethod" className="mb-3">
          <Form.Label>Payment Method</Form.Label>
          <Form.Control
            as="select"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="PayPal">PayPal</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Payment
        </Button>
      </Form>
      <br />
      <a href="http://localhost:3000">Back to Home</a>
    </Container>
  );
}

export default Billing;
