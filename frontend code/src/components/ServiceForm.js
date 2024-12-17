import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Form, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './ServiceForm.css';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaUserPlus, FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from './UserContext';

const ServiceForm = () => {
  const { user, logout } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [continent, setContinent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Show modal after form submission
  };

  const handleModalClose = () => setShowModal(false);

  const handleConfirm = () => {
    // Redirecting to ResultPage with query parameters
    navigate(
      `/ResultPage?continent=${encodeURIComponent(continent)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
    );
  };

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

      {/* Main Form Section */}
      <Container className="form-container mt-5 pt-5">
        <h2 className="text-center">Request Our Services</h2>
        <p className="text-center">Fill out the form below to request a service.</p>

        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContinent">
            <Form.Label>Continent</Form.Label>
            <Form.Select
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
              required
            >
              <option value="">Select your continent</option>
              <option>Africa</option>
              <option>East Asia</option>
              <option>South Asia</option>
              <option>Caucasian American</option>
              <option>Caucasian European</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="outline-secondary" onClick={() => navigate('/service')}>
              Back to Services
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>To ensure accurate predictions, please confirm your continent selection. Proceed?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <footer className="bg-dark py-4">
        <Container className="text-center">
          <p style={{ color: 'white' }}>© 2024 DeepGuard. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default ServiceForm;
