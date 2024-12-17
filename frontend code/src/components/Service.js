import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, ProgressBar, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Service.css';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaUserPlus, FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from './UserContext';

const Service = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isUploading] = useState(false);
  const [uploadProgress] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    AOS.init({ disable: true });
  }, []);
  
  
  const handleServiceButtonClick = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate('/ServiceForm');
    }
  };

  const handleCloseModal = () => setShowLoginModal(false);
  const [showEmail, setShowEmail] = useState(false);

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

      <main id="main" className="pt-5 mt-5">
        <section id="services" className="services section-bg">
          <Container data-aos="fade-up">
            <div className="section-header text-center">
              <h2>Services</h2>
              <p>Explore Our Comprehensive DeepGuard Detection Services:</p>
            </div>

            <div className="row gy-4">
              <div className="col-lg-4 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="100">
                <div className="service-item text-center">
                  <div className="icon">
                    <i className="bi bi-cloud-upload"></i>
                  </div>
                  <h3>Upload Files</h3>
                  <p>Upload your video files to our system. We accept various formats including MP4. Please ensure that the file size does not exceed 500MB for a smoother experience.</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="200">
                <div className="service-item text-center">
                  <div className="icon">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  <h3>Analyze Content</h3>
                  <p>Advanced algorithms analyze the uploaded media files for any signs of manipulation. This process involves checking for inconsistencies, artifacts, and other indicators of tampering.</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12" data-aos="fade-up" data-aos-delay="300">
                <div className="service-item text-center">
                  <div className="icon">
                    <i className="bi bi-check"></i>
                  </div>
                  <h3>Provide Results</h3>
                  <p>Get detailed detection results indicating whether the content is manipulated or not. The results include a comprehensive report with visual evidence and statistical analysis.</p>
                  {isUploading && <ProgressBar animated now={uploadProgress} label={`${uploadProgress}%`} />}
                </div>
              </div>
            </div>

            <div className="text-center mt-5">
              <Button variant="success" className="btn-lg" onClick={handleServiceButtonClick}>
                Click Here to Take Services
              </Button>
            </div>
          </Container>
        </section>
      </main>

      <footer className="bg-dark py-4">
        <Container className="text-center">
          <p style={{ color: 'white' }}>© 2024 DeepGuard. All rights reserved.</p>
        </Container>
      </footer>

      <Modal show={showLoginModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You must be logged in to take the services. Please log in to continue.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" as={Link} to="/login">
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Service;
