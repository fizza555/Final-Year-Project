import React, { useState } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
  FaUserPlus,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa'; // Importing icons
import { useUser } from './UserContext'; // Import the UserContext

const Home = () => {
  const { user, logout } = useUser(); // Access user data and logout function
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

      <section id="home">
        <Carousel className="fullscreen-carousel"interval={3000} pause="hover"wrap={true} controls={true}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.prod.website-files.com/63da3362f67ed6f71c9489c1/665569998200c32440869d92_deepfake-detector.png"
              alt="First slide"
            />
            <Carousel.Caption className="carousel-caption-custom">
              <h2>Welcome to DeepGuard</h2>
              <p>
                DeepGuard is dedicated to advancing the field of deepfake detection through innovative research and development. Our mission is to provide effective solutions for identifying manipulated audio and video content while maintaining the integrity of the original media.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
               src="https://www.bioid.com/wp-content/uploads/Deep-fake-detection-AI.webp"
              alt="Second slide"
            />
            <Carousel.Caption className="carousel-caption-custom">
              <h2>Welcome to DeepGuard</h2>
              <p>
                DeepGuard is dedicated to advancing the field of deepfake detection through innovative research and development. Our mission is to provide effective solutions for identifying manipulated audio and video content while maintaining the integrity of the original media.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i0.wp.com/onlyiafakes.com/wp-content/uploads/2023/11/What-are-Deepfakes-edited.jpeg?fit=768%2C432&ssl=1"
              alt="Third slide"
            />
            <Carousel.Caption className="carousel-caption-custom">
              <h2>Welcome to DeepGuard</h2>
              <p>
                DeepGuard is dedicated to advancing the field of deepfake detection through innovative research and development. Our mission is to provide effective solutions for identifying manipulated audio and video content while maintaining the integrity of the original media.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      <Container>
        <section id="about" className="mb-5 text-center">
          <h2 className="mb-3">About DeepGuard</h2>
          <p>DeepGuard is a state-of-the-art application designed to detect audio and video deepfakes using advanced AI techniques. Our mission is to provide reliable and efficient tools to combat misinformation and digital fraud.</p>
        </section>

        <section id="get-started" className="mb-5">
          <h2 className="mb-3">Get Started</h2>
          <p>Ready to safeguard your content? <Link to="/service" className="text-success">Services</Link> to learn more and get started today!</p>
          <Link to="/contact" className="btn btn-success mt-3">Contact Us</Link>
        </section>
      </Container>

      <footer className="bg-dark py-4">
        <Container className="text-center">
          <p style={{ color: 'white' }}>© 2024 DeepGuard. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
