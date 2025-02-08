import React from "react";
import { Link } from "react-router-dom";
import "../css/eventcard.css";

function EventHome() {
  return (
    <div style={{ backgroundColor: "#f2f7ff" }}>
      <div id="main">
        <header className="mb-3">
          <p className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </p>
        </header>
        <div className="page-heading">
          <div>
            <h3>Welcome, User</h3>
          </div>
        </div>
        <div className="page-content">
          <section className="row">
            <div className="col-md-9">
              <div className="card border-primary shadow">
                <div className="card-body">
                  <p className="lead text-muted">
                    Explore and manage your events effortlessly with our Event
                    Management Platform. Host engaging virtual, hybrid, and
                    in-person events with ease.
                  </p>
                  <button className="btn btn-primary btn-lg rounded-pill mb-3">
                    Host New Event
                  </button>
                  <p className="h4 text-danger mb-3">
                    Explore Event Registration & Ticketing Tools:
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="profile-card-2">
                    <img
                      src="assets/images/customevents/b1.png"
                      style={{ height: "290px" }}
                      className="img img-responsive"
                      alt="Profile"
                    />
                    <div className="profile-name">JOHN DOE</div>
                    <div className="profile-username">@johndoesurname</div>
                    <div className="profile-icons">
                      <button className="btn btn-link">
                        <i className="fa fa-facebook" />
                      </button>
                      <button className="btn btn-link">
                        <i className="fa fa-twitter" />
                      </button>
                      <button className="btn btn-link">
                        <i className="fa fa-linkedin" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">New Event</h5>
                  <p className="card-text">Create and host a new event effortlessly.</p>
                  <button className="btn btn-primary">Create Event</button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">View My Events</h5>
                  <p className="card-text">Browse and manage your existing events.</p>
                  <Link to="/myevents" className="btn btn-primary">View My Events</Link>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Explore More</h5>
                  <p className="card-text">Discover additional features and tools.</p>
                  <button className="btn btn-primary">Explore</button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Contact Us</h5>
                  <p className="card-text">Have questions? Reach out to our support team.</p>
                  <button className="btn btn-primary">Contact</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventHome;
