import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from './UserContext';
import './Login.css';


const Login = () => {
  const { user, login, logout } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Check if the user is already logged in
    if (user) {
      setMessage('You are already logged in!');
      setMessageType('danger');
      return; // Stop the login attempt if the user is already logged in
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5002/Login', { email, password });

      if (response.data.message === 'Login successful') {
        setMessage('Login successful!');
        setMessageType('success');
        login(response.data.user); // Store the user data in context
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage(response.data.error || 'Invalid credentials. Please try again.');
        setMessageType('danger');
      }

      // Clear input fields
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('An error occurred. Please try again.');
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

      {/* Login Form Section */}
      <Container className="login-container">
        <Row className="justify-content-center align-items-center w-100">
          <Col md={6} lg={5} xl={4}>
            <Card className="login-card">
              <Card.Body>
                <Card.Title className="text-center">Welcome Back to DeepGuard</Card.Title>
                
                {/* Dummy hidden fields to trick autofill */}
                <form style={{ display: 'none' }}>
                  <input type="text" name="username" />
                  <input type="password" name="password" />
                </form>

                <Form onSubmit={handleLogin} autoComplete="off">
                  <Form.Group controlId="emailField">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="login_email" // Unique name to avoid browser autofill
                      autoComplete="new-email"  // Use less common autocompletes
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="passwordField">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="login_password" // Unique name to avoid browser autofill
                      autoComplete="new-password"  // Use less common autocompletes
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </Form>
                {message && (
                  <Alert variant={messageType} className="mt-3">
                    {message}
                  </Alert>
                )}
                <div className="text-center mt-3">
                  Don't have an account? <Link to="/Signup">Sign up here</Link>
                </div>
                <div className="text-center mt-3">
                  <Link to="/ForgotPassword">Forgot password?</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={5} xl={4} className="d-none d-md-block">
            <div className="login-gif">
              <img
                src="https://media1.giphy.com/media/4blktKaXDvhnuSmtev/giphy.gif?cid=6c09b952sqq31xtzrh5apk9pkis7ry1andkqskxxmcw7rvil&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
                alt="Login Animation"
              />
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

export default Login;
