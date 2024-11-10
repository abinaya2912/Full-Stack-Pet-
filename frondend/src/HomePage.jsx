import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

const HomePage = () => {
  return (
    <div className="App">
      {/* Transparent Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">FourPaws</div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Pet-List</Link></li>
          <li><Link to="/login">Recommend-Food</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>

      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <h1>Find Your Perfect Pet Companion</h1>
          <p>Connecting loving families with pets in need of a home</p>
          <div className="benefits">
            <div className="benefit-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqqEz8mcMAUNM8YmghD9lVzDC-tMSNMiF6fgVdox3zg-JS8TZQJWWSRfVc7ehzQrNbLUg&usqp=CAU" alt="Adopt a Friend" />
              <p>Adopt a New Friend</p>
            </div>
            <div className="benefit-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM6bynRhaGGiIHem_DDcq-X76N-JzJDWO0Yg&s" alt="Save Lives" />
              <p>Save a Life</p>
            </div>
            <div className="benefit-item">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgImzln2aPSHEk7yFtLUWzDH9WXqP5RFc15w&s" alt="Find Joy" />
              <p>Find Joy in Companionship</p>
            </div>
          </div>
        </div>
        <div className="header-image">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ7evcDXmFBcRmQ1oGVFc9GLvEhddfpgVc5Q&s" alt="Pet Adoption" />
        </div>
      </header>

      {/* About Us Section */}
      <section className="about-us-section">
        <h2>About Us</h2>
        <div className="about-us-content">
          <div className="about-carousel">
            <Carousel
              showThumbs={false}
              infiniteLoop
              autoPlay
              interval={5000}
              showStatus={false}
            >
              <div className="carousel-slide">
                <h3>Our Vision</h3>
                <p>To ensure every pet finds a loving, forever home with a caring family.</p>
              </div>
              <div className="carousel-slide">
                <h3>Our Mission</h3>
                <p>Connecting pets with compassionate adopters, promoting responsible pet ownership.</p>
              </div>
              <div className="carousel-slide">
                <h3>Our Core Values</h3>
                <p>We believe every animal deserves a chance at happiness and a loving home.</p>
              </div>
            </Carousel>
          </div>
          <div className="about-image">
            <img src="https://www.shutterstock.com/image-vector/adopt-dog-pet-animals-adoption-600nw-2234595001.jpg" alt="Pet Care" />
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>If you have questions, need support, or want to know more about adopting, we’re here to help!</p>
        <div className="contact-info">
          <p>Email: support@petadopt.com</p>
          <p>Phone: +123-456-7890</p>
          <p>Address: 456 Animal Haven, Compassion City, Pawland</p>
        </div>

        {/* Feedback Form and Image Side-by-Side */}
        <div className="feedback-container">
          <form className="feedback-form">
            <h3>Send Us Your Feedback</h3>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Message:
              <textarea name="message" rows="4" required></textarea>
            </label>
            <button type="submit">Submit</button>
          </form>

          {/* Right Side Image */}
          <div className="feedback-image">
            <img src="https://www.shutterstock.com/image-photo/litter-terrier-mix-puppies-playing-260nw-336435884.jpg" alt="Contact Us" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
