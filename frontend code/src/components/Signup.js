import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaUserPlus, FaSignInAlt } from 'react-icons/fa'; // Import necessary icons
import './Signup.css';

const Signup = () => {
  // Removed name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'
  const [loading, setLoading] = useState(false); // New loading state

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      setMessageType('danger');
      return;
    }
  
    // Validate email format and domain (same as backend)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com|[a-zA-Z0-9.-]+\.[a-z]{2,})$/i;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email with the correct domain (e.g., gmail.com, yahoo.com, etc.).');
      setMessageType('danger');
      return;
    }
  
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post('http://localhost:5002/Signup', { email, password });
      setMessage(response.data.message || 'Signup successful!');
      setMessageType('success');
      setEmail(''); // Clear email field
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('There was an error!', error);
  
      // Check if the error response is related to user already existing
      if (error.response && error.response.status === 409) {
        setMessage(error.response.data.error); // Update message for existing user
      } else if (error.response && error.response.status === 400) {
        setMessage(error.response.data.error); // Display validation error
      } else {
        setMessage('An error occurred. Please try again.');
      }
      setMessageType('danger');
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  

  return (
    <div className="signup-page">
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
                <Nav.Link as={Link} to="/ Signup" style={{ color: 'white' }}>
                  <FaUserPlus className="mr-1" /> Signup
                </Nav.Link>
                <Nav.Link as={Link} to="/Login" style={{ color: 'white' }}>
                  <FaSignInAlt className="mr-1" /> Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <Container className="signup-container">
        <Row className="justify-content-center align-items-center w-100">
          <Col md={6} lg={5} xl={4}>
            <Card className="signup-card">
              <Card.Body>
                <Card.Title className="text-center">Welcome to DeepGuard</Card.Title>
                <Form onSubmit={handleSignup}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  Already have an account? <Link to="/Login">Login here</Link>
                </div>
                <div className="text-center mt-3">
                  <Link to="/">Back to Home</Link>
                </div>
                {message && (
                  <Alert variant={messageType} className="mt-3">
                    {message}
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={5} xl={4} className="d-none d-md-block">
            <div className="signup-gif">
              <img src="https://media0.giphy.com/media/CEqyUMI3avruOB5tmn/200w.gif?cid=82a1493bykr9vd8odmlvz2lqdpks1hgr9lz9ooig03hk8rv7&ep=v1_gifs_related&rid=200w.gif&ct=s" alt="Signup Animation" />
            </div>
          </Col>
        </Row>
      </Container>
      <footer className="bg-dark py-4">
  <Container className="text-center">
    <p style={{ color: 'white' }}>© 2024 DeepGuard. All rights reserved.</p>
  </Container>
</footer>
    </div>
      
         
  );
};

export default Signup;
