import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaUserPlus, FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import { useUser } from './UserContext'; 

const Contact = () => {
  const { user, logout } = useUser(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState('');

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.message) formErrors.message = 'Message is required';
    return formErrors;
  };

  const handleChange = (e) => {
    // Reset the alert state when user starts typing
    setAlert('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    axios.post('http://localhost:3001/submit', formData)
      .then(response => {
        setAlert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      })
      .catch(error => {
        setAlert('Failed to send message. Enter Valid Email');
        console.error(error);
      });
  };

  // Access user data and logout function
  const [showEmail, setShowEmail] = useState(false); // State to manage email visibility

  return (
    <div>
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
                {/* Display signup link always */}
                <Nav.Link as={Link} to="/signup" style={{ color: 'white' }}>
                  <FaUserPlus className="mr-1" /> Signup
                </Nav.Link>

                {/* If user is logged in, show profile icon and logout */}
                {user ? (
                  <>
                    <Nav.Link
                      style={{ color: 'white', position: 'relative' }}
                      className="d-flex align-items-center"
                      onMouseEnter={() => setShowEmail(true)}
                      onMouseLeave={() => setShowEmail(false)}
                    >
                      <div
                        className="rounded-circle bg-light text-dark"
                        style={{
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '5px',
                        }}
                      >
                        <FaUser />
                      </div>
                      {/* Conditionally show email on hover */}
                      {showEmail && (
                        <span
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            color: 'white',
                            padding: '5px',
                            borderRadius: '5px',
                            position: 'absolute',
                            top: '100%',
                            left: '0',
                            whiteSpace: 'nowrap',
                            zIndex: 10,
                          }}
                        >
                          {user.email}
                        </span>
                      )}
                    </Nav.Link>
                    <Nav.Link
                      style={{ color: 'white' }}
                      onClick={logout}
                      className="d-flex align-items-center"
                    >
                      <FaSignOutAlt className="mr-1" /> Logout
                    </Nav.Link>
                  </>
                ) : (
                  <Nav.Link as={Link} to="/login" style={{ color: 'white' }}>
                    <FaSignInAlt className="mr-1" /> Login
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main id="main" className="pt-5">
        <section id="contact" className="contact-section">
          <Container>
            <br></br>
            <h1>Contact Us</h1>
            <p className="text-center">We'd love to hear from you! Drop us a message below:</p>

            {alert && <Alert variant={alert.includes('successfully') ? 'success' : 'danger'}>{alert}</Alert>}

            <Form className="contact-form" onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicMessage" style={{ marginBottom: '20px' }}>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={5}
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  isInvalid={!!errors.message}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" style={{ marginBottom: '20px' }}>
                Submit
              </Button>
            </Form>
          </Container>
        </section>
      </main>

      <footer className="bg-dark py-4">
        <Container className="text-center">
          <p style={{ color: 'white' }}>© 2024 DeepGuard. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Contact;
