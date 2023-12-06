import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Layout from "../components/Layout";
import Book from "./book/Book";
import DetailBook from "./book/DetailBook";
import Cart from "./cart/Cart";
import Order from "./order/Order";
import Profile from "./auth/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/bookstore/:userId/books"
          element={
            <Layout>
              <Book />
            </Layout>
          }
        />
        <Route
          path="/bookstore/:userId/books/:bookId"
          element={<DetailBook />}
        />
        <Route path="/bookstore/:userId/carts" element={<Cart />} />
        <Route path="/bookstore/:userId/orders" element={<Order />} />
        <Route path="/bookstore/:userId/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
