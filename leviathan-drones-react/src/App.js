import React from "react";
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Cart from "./pages/Cart";
import ItemList from "./pages/ItemList";
import Billing from "./pages/Billing";

function App() {
  return (
    <Router basename="/react">
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/item-list" element={<ItemList />} />
        <Route path="/billing" element={<Billing />} />
        {/* <Route path="/video-lessons" element={<VideoLessons />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
