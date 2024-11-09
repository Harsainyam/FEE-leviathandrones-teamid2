import React, { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
    const [cartItems, setCartItems] = useState([
      { id: 1, name: "Drone Model A", price: 299, quantity: 1 },
      { id: 2, name: "Drone Model B", price: 499, quantity: 1 },
    ]);
  
    const handleRemove = (itemId) => {
      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
    };
  
    const handleQuantityChange = (itemId, increment) => {
      const updatedCart = cartItems.map((item) => {
        if (item.id === itemId) {
          const updatedQuantity = item.quantity + increment;
          return { ...item, quantity: updatedQuantity > 0 ? updatedQuantity : 1 };
        }
        return item;
      });
      setCartItems(updatedCart);
    };
  
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  
    return (
      <Container className="cart-page">
        <h1 className="mb-4">Shopping Cart</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                    className="ml-2"
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
        <Button variant="primary" href="/billing">
          Proceed to Billing
        </Button>
        <br />
        <a href="http://localhost:3000">Back to Home</a>
      </Container>
    );
  }
  
  export default Cart;
