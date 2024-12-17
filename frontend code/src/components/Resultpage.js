import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Form, Button, ProgressBar, Spinner, Modal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ResultPage.css';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaUserPlus, FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from './UserContext';

const ResultPage = () => {
  const { user, logout } = useUser();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [continent, setContinent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);
  const [targetPath, setTargetPath] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Get query parameters from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const continent = params.get('continent');
    const name = params.get('name');
    const email = params.get('email');

    setContinent(continent);
    setName(name);
    setEmail(email);
  }, [location]);

  // Handle file changes
  const handleFileChange = (e) => {
    if (!loading) {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type === 'video/mp4') {
        setFile(selectedFile);
        setResult(null);
        setError('');
      } else {
        setError('Please attach a video file (MP4 only).');
        setFile(null);
        setResult(null);
      }
    }
  };

  // Handle file upload submission
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file || !continent) {
      setError('Please select a video and continent.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('continent', continent);

    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'File upload failed.');
      }

      const resultData = await response.json();
      setResult(resultData.predicted_label);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    if (loading) {
      setShowLogoutWarning(true);
    } else {
      logout();
      navigate('/');
    }
  };

  // Handle navigation by React Router Link
  const handleLinkClick = (e, path) => {
    e.preventDefault();

    if (loading) {
      setTargetPath(path);
      setShowLeaveConfirmation(true);
    } else {
      navigate(path);
    }
  };

  // Close the logout warning modal
  const closeLogoutWarning = () => {
    setShowLogoutWarning(false);
  };

  // Handle the case when user tries to navigate via links in header
  const handleButtonNavigation = (path) => {
    if (loading) {
      setTargetPath(path);
      setShowLeaveConfirmation(true);
    } else {
      navigate(path);
    }
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
                <Nav.Link onClick={(e) => handleLinkClick(e, '/')} style={{ color: 'white' }}>
                  <FaHome className="mr-1" /> Home
                </Nav.Link>
                <Nav.Link onClick={(e) => handleLinkClick(e, '/about')} style={{ color: 'white' }}>
                  <FaInfoCircle className="mr-1" /> About
                </Nav.Link>
                <Nav.Link onClick={(e) => handleLinkClick(e, '/service')} style={{ color: 'white' }}>
                  <FaServicestack className="mr-1" /> Services
                </Nav.Link>
                <Nav.Link onClick={(e) => handleLinkClick(e, '/contact')} style={{ color: 'white' }}>
                  <FaEnvelope className="mr-1" /> Contact Us
                </Nav.Link>
                <Nav.Link onClick={(e) => handleLinkClick(e, '/signup')} style={{ color: 'white' }}>
                  <FaUserPlus className="mr-1" /> Signup
                </Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                {user ? (
                  <>
                    <Nav.Link style={{ color: 'white', position: 'relative' }} className="d-flex align-items-center">
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
                    </Nav.Link>
                    <Nav.Link style={{ color: 'white' }} onClick={handleLogout} className="d-flex align-items-center">
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

      <main className="pt-5">
        <Container className="result-container">
          <h2 className="text-center mb-4">Upload File for Analysis</h2>

          <Form onSubmit={handleFileUpload} className="custom-form">
            <Form.Group controlId="formFile" className="mb-4">
              <Form.Label>Attach File</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={handleFileChange}
                isInvalid={!!error}
                disabled={loading} // Disable file input if loading
              />
              {loading && (
                <Form.Text className="text-danger">
                  A file is currently being processed. Please wait until it completes.
                </Form.Text>
              )}
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit" className="btn-lg" disabled={loading}>
                {loading ? 'Processing...' : 'Display Results'}
              </Button>
            </div>
          </Form>

          {loading && (
            <div className="text-center mt-4">
              <Spinner animation="border" role="status" className="mb-3">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <ProgressBar animated now={100} label="Processing..." />
            </div>
          )}

          {result && (
            <div className="text-center mt-4 result-box">
              <h3>Analysis Result: {result}</h3>
            </div>
          )}

          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => handleButtonNavigation('/ServiceForm')}>
              Go Back
            </Button>
          </div>
        </Container>
      </main>

      <Modal show={showLogoutWarning} onHide={closeLogoutWarning}>
        <Modal.Header closeButton>
          <Modal.Title>Cannot Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You cannot log out while the file is being processed.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeLogoutWarning}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showLeaveConfirmation} onHide={() => setShowLeaveConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Navigation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You have a file upload in progress. Are you sure you want to leave this page?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLeaveConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => navigate(targetPath)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResultPage;
