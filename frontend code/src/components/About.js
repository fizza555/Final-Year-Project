import React, { useState } from 'react';
import './About.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaServicestack, FaEnvelope, FaUserPlus, FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useUser } from './UserContext';

const About = () => {
  const { user, logout } = useUser();
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className="about-page">
      {/* Navbar */}
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
    
      <section id="video-section" className="video-section py-5">
  <Container>
    <div className="row align-items-center">
      <div className="col-md-6">
      
      <h2 className="text-center mb-5 team-heading">Scan & Detect Deepfake Videos</h2>
        <p className="video-text text-center">
        In today's digital age, the ability to manipulate videos and images has become increasingly sophisticated. Deepfake technology, which uses AI to create hyper-realistic altered videos, poses significant risks to privacy, security, and trust. At DeepGuard, we offer cutting-edge solutions to help you scan and detect deepfake videos, ensuring that you can quickly identify whether a video has been synthetically manipulated. Our powerful AI-driven tools analyze subtle inconsistencies, such as facial movements, audio-visual misalignments, and other telltale signs that may indicate tampering. Whether you're a business, law enforcement, or a concerned individual, our on-premise solutions provide the accuracy and reliability needed to protect you from the dangers of deepfakes. Trust DeepGuard to safeguard your digital environment and give you peace of mind in an increasingly complex technological landscape.
        </p>
      </div>
      <div className="col-md-6">
        {/* Video Embed with fixed dimensions */}
        <div className="embed-responsive" style={{ position: 'relative', paddingBottom: '56.25%' }}>
          <iframe 
            src="newvideo.mp4" 
            title="Deepfake Detection Video" 
            className="embed-responsive-item" 
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></iframe>
        </div>
      </div>
    </div>
  </Container>
</section>


      {/* Who We Are Section */}
      <section id="who-we-are" className="who-we-are py-5 bg-light">
        <Container>
          <div className="row align-items-center">
            <div className="col-md-6">
            
              <h2 className="text-center mb-5 team-heading">Who We Are</h2>
              <p className="who-we-are-text text-center">
                At DeepGuard, we are a team of passionate innovators dedicated to redefining the future of cybersecurity. With AI-driven solutions, we empower individuals and businesses to stay safe in an ever-changing digital landscape. Our commitment is to protect your data, privacy, and digital assets with the most advanced technologies available.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="https://svmsolutions.com/wp-content/uploads/2020/01/converting-about-us-page.jpg"
                alt="About DeepGuard"
                className="img-fluid rounded shadow-lg who-we-are-image"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* The Problem We Solve Section */}
      <section id="problem-we-solve" className="problem-we-solve py-5">
        <Container>
          <div className="row">
            <div className="col-md-12">
            <h2 className="text-center mb-5 team-heading">The Problem We Solve</h2>
            
              <p className="problem-text text-center">
                In today’s rapidly evolving digital world, cyber threats are more sophisticated than ever before. Individuals and organizations face constant risks to their digital privacy and security. DeepGuard was created to tackle these growing challenges head-on. Through our cutting-edge AI solutions, we proactively protect against emerging threats, giving you peace of mind in the digital age.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Vision Section */}
      <section id="our-vision" className="our-vision py-5 bg-light">
        <Container>
          <div className="row">
            <div className="col-md-12">
            <h2 className="text-center mb-5 team-heading">Our Vision</h2>
              <p className="vision-text text-center">
                At DeepGuard, our vision is to lead the next wave of cybersecurity innovation by harnessing the full potential of artificial intelligence. We aim to create a future where digital threats are minimized, allowing businesses and individuals to thrive safely in an interconnected world. Our commitment to technology, trust, and innovation drives us forward, empowering our clients to face the future with confidence.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Meet the Team Section */}
      <section id="team" className="team py-5">
        <Container>
          <h4 className="text-center mb-5 team-heading">Meet Our Collaborative Team</h4>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="team-card p-4 text-center shadow rounded">
                <h4 className="mb-3">Innovative Minds</h4>
                <p>Our team consists of forward-thinking professionals dedicated to pushing the boundaries of AI and technology, always striving for excellence.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card p-4 text-center shadow rounded">
                <h4 className="mb-3">Expert Collaborators</h4>
                <p>Bringing expertise from diverse fields like data science, software development, and machine learning to deliver powerful, real-world solutions.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="team-card p-4 text-center shadow rounded">
                <h4 className="mb-3">Visionary Leaders</h4>
                <p>Guiding the team with clarity, foresight, and purpose to continuously drive innovation and excellence in AI-driven cybersecurity.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark py-4">
        <Container className="text-center">
          <p className="text-white">© 2024 DeepGuard. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default About;
