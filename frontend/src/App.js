import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { auth } from "./components/firebase";
import PostList from "./components/Post/PostList/PostList";
import PostDetail from "./components/Post/PostDetail/PostDetail";
import Sidebar from "./components/Sidebar/Sidebar";
import About from "./components/About/About";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <Router>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Login />
        </div>
      </Router>
    );
  }

  return (
    <Router basename="/dummyApp">
      <Container fluid className="App p-0">
        <Row className="flex-nowrap d-flex w-100 m-0">
          <Col xs={2} md={2} className="sidebar-container p-0">
            <Sidebar />
          </Col>
          <Col xs={10} md={10} className="main-content p-0">
            <Routes>
              <Route path="/posts" element={<PostList />} />
              <Route path="*" element={<Navigate to="/posts" />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="about" element={<About />} />
            </Routes>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </Router>
  );
}

export default App;
