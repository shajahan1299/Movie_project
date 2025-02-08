import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md-4">
            <h3 style={{ color: "white" }}>About Us</h3>
            <p>
              Welcome to the Movie Management System, your go-to platform for managing and discovering the latest movies.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4">
  <h3 style={{ color: "white" }}>Connect with Us</h3>
  <div className="social-icons">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ paddingLeft: "20px" }} aria-label="Facebook">
      <FontAwesomeIcon icon={faFacebook} />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ paddingLeft: "20px" }} aria-label="Twitter">
      <FontAwesomeIcon icon={faTwitter} />
    </a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={{ paddingLeft: "20px" }} aria-label="Instagram">
      <FontAwesomeIcon icon={faInstagram} />
    </a>
  </div>
</div>


          {/* Contact Information */}
          <div className="col-md-4">
            <h3 style={{ color: "white" }}>Contact Information</h3>
            <p>
              Email: info@moviemanagement.com
              <br />
              Phone: +123-456-7890
            </p>
          </div>
        </div>
      </div>

      <hr className="divider" />

      {/* Footer Bottom Text */}
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <p>&copy; {new Date().getFullYear()} Movie Management System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
