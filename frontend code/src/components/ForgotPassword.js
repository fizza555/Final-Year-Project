import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from './UserContext';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'
  const [loading, setLoading] = useState(false);
  const { user, logout } = useUser();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      setMessage('Please enter your email');
      setMessageType('danger');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5002/forgot-password', { email });
      setMessage('Password reset link sent to your email.');
      setMessageType('success');
      setEmail(''); // Clear email field
    } catch (err) {
      setMessage(err.response?.data?.error || 'An error occurred. Please try again later.');
      setMessageType('danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Header Section */}
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">DeepGuard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/" style={{ color: 'white' }}>
                  <FaHome className="mr-1" /> Home
                </Nav.Link>
                <Nav.Link as={Link} to="/about" style={{ color: 'white' }}>
                  <FaInfoCircle className="mr-1" /> About
                </Nav.Link>
                <Nav.Link as={Link} to="/service" style={{ color: 'white' }}>
                  <FaServicestack className="mr-1" /> Services
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" style={{ color: 'white' }}>
                  <FaEnvelope className="mr-1" /> Contact Us
                </Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                {!user ? (
                  <>
                    <Nav.Link as={Link} to="/Signup" style={{ color: 'white' }}>
                      <FaUserPlus className="mr-1" /> Signup
                    </Nav.Link>
                    <Nav.Link as={Link} to="/Login" style={{ color: 'white' }}>
                      <FaSignInAlt className="mr-1" /> Login
                    </Nav.Link>
                  </>
                ) : (
                  <Nav.Link onClick={logout} style={{ color: 'white' }}>
                    <FaSignOutAlt className="mr-1" /> Logout
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {/* Forgot Password Form Section */}
      <Container className="login-container">
        <Row className="justify-content-center align-items-center w-100">
          <Col md={6} lg={5} xl={4}>
            <Card className="login-card">
              <Card.Body>
                <Card.Title className="text-center">Forgot Password</Card.Title>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="emailField">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                    {loading ? 'Sending...' : 'Submit'}
                  </Button>
                </Form>

                {/* Display success or error message */}
                {message && (
                  <Alert variant={messageType} className="mt-3">
                    {message}
                  </Alert>
                )}

                {/* Additional Links */}
                <div className="text-center mt-3">
                  <Link to="/Login">Back to Login</Link>
                </div>
                
              </Card.Body>
            </Card>
          </Col>
          {/* GIF Section for Desktop View */}
          <Col md={6} lg={5} xl={4} className="d-none d-md-block">
           
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
