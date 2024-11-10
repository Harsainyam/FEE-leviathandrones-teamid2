import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./ItemList.css";

const items = [
  { id: 1, name: "Drone Part A", price: 5000, imgSrc: "path_to_image1.jpg", description: "High-performance drone for underwater exploration." },
  { id: 2, name: "Drone Part B", price: 499, imgSrc: "path_to_image2.jpg", description: "Advanced drone with extended battery life." },
  { id: 3, name: "Drone Part C", price: 399, imgSrc: "path_to_image3.jpg", description: "Compact and lightweight drone for versatile use." },
];

function ItemList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container my-4">
      <h1 className="mb-4">Item List</h1>
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4" key={item.id}>
            <div className="card mb-4">
              <img src={item.imgSrc} className="card-img-top" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">${item.price}</p>
                <Button variant="primary" onClick={() => handleItemClick(item)}>
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/cart" className="btn btn-primary mt-3">
        Go to Cart
      </Link>
      {/* Modal for item details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedItem?.imgSrc} alt={selectedItem?.name} className="img-fluid mb-3" />
          <p><strong>Price:</strong> ${selectedItem?.price}</p>
          <p>{selectedItem?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Navigation Links */}
      <br />
      <a href="http://localhost:3000">Back to Home</a>
    </div>
  );
}

export default ItemList;
