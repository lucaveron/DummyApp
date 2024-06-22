import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "./components/firebase";
import PostList from "./components/Post/PostList/PostList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Login/Profile";
function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    // console.log(user);
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

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
    <Router>
      <Container fluid className="App d-flex">
        <Row className="flex-nowrap w-100">
          <Col xs={2} md={2} className="sidebar-container p-0"></Col>
          <Col
            xs={10}
            md={10}
            className="main-content p-0 d-flex justify-content-center"
          >
            <Routes>
              <Route path="/posts" element={<PostList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/posts" />} /> 
            </Routes>
          </Col>
        </Row>

        <ToastContainer />
      </Container>
    </Router>
  );
}

export default App;
