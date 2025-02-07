import React from "react";
import { Link } from "react-router-dom";
import "../css/eventcard.css";

function EventHome() {
  return (
    <div style={{ backgroundColor: "#f2f7ff" }}>
      <div id="main" >
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
            <div className="">
              <div className="row">
                {/* -------------------row------------------ */}
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon purple">
                            <i className="iconly-boldShow"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">
                            View Rating
                          </h6>
                          <h6 className="font-extrabold mb-0">21</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon blue">
                            <i className="iconly-boldProfile"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">
                            View Feedback
                          </h6>
                          <h6 className="font-extrabold mb-0">2678</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon green">
                            <i className="iconly-boldAdd-User"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">
                            Following
                          </h6>
                          <h6 className="font-extrabold mb-0">80.000</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-lg-3 col-md-6">
                  <div className="card">
                    <div className="card-body px-3 py-4-5">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="stats-icon red">
                            <i className="iconly-boldBookmark"></i>
                          </div>
                        </div>
                        <div className="col-md-8">
                          <h6 className="text-muted font-semibold">
                            Saved Post
                          </h6>
                          <h6 className="font-extrabold mb-0">112</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </section>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-9">
              <div className="card border-primary shadow">
                <div className="card-body">
                  {/* Make "Event Management" bold and large */}
                  

                  <p className="lead text-muted">
                    Explore and manage your events effortlessly with our Event
                    Management Platform. Host engaging virtual, hybrid, and
                    in-person events with ease.
                  </p>
                  <br></br>
                  <button className="btn btn-primary btn-lg rounded-pill mb-3">
                    Host New Event
                  </button>
                  <br></br>
                  <p className="h4 text-danger mb-3">
                    Explore Event Registration & Ticketing Tools:
                  </p>
                  <br></br>
                  <ul className="list-group">
                    
                
                    Run live meetings, face-to-face experiences, in-person
                    events, or virtual webinars with the award-winning InEvent
                    platform. Utilize comprehensive tools for seamless event
                    registration, ticketing, and attendee management.
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-3">


              
              <div className="card">
                <div className="card-body">
                  <div className="profile-card-2">
                    <img
                      src="assets\images\customevents\b1.png"
                      style={{ height: "290px" }}
                      className="img img-responsive"
                      alt="Profile"
                    />
                    <div className="profile-name">JOHN DOE</div>
                    <div className="profile-username">@johndoesurname</div>
                    <div className="profile-icons">
                      <a href="#">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fa fa-linkedin" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">New Event</h5>
                  <p className="card-text">
                    Create and host a new event effortlessly.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Create Event
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">View My Events</h5>
                  <p className="card-text">
                    Browse and manage your existing events.
                  </p>
                  <Link to="/myevents">
                        <a  class="btn btn-primary">View My Events</a>
                  </Link> 
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Explore More</h5>
                  <p className="card-text">
                    Discover additional features and tools.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Explore
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Contact Us</h5>
                  <p className="card-text">
                    Have questions? Reach out to our support team.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="profile-card-6">
                    <img
                      src="assets\images\customevents\b5.png"
                      className="img img-responsive img-fluid" // Add img-fluid class
                      alt="Profile"
                      style={{ height: "350px" }}
                    />
                    <div className="profile-name">JOHN DOE</div>
                    <div className="profile-position">Lorem Ipsum Donor</div>
                    <div className="profile-overview">
                      <div className="row text-center">
                        <div className="col-xs-4">
                          <h3>1</h3>
                          <p>Rank</p>
                        </div>
                        <div className="col-xs-4">
                          <h3>50</h3>
                          <p>Matches</p>
                        </div>
                        <div className="col-xs-4">
                          <h3>35</h3>
                          <p>Goals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="profile-card-6">
                    <img
                      src="assets\images\customevents\b2.png"
                      className="img img-responsive img-fluid" // Add img-fluid class
                      alt="Profile"
                      style={{ height: "350px" }}
                    />
                    <div className="profile-name">JOHN DOE</div>
                    <div className="profile-position">Lorem Ipsum Donor</div>
                    <div className="profile-overview">
                      <div className="row text-center">
                        <div className="col-xs-4">
                          <h3>1</h3>
                          <p>Rank</p>
                        </div>
                        <div className="col-xs-4">
                          <h3>50</h3>
                          <p>Matches</p>
                        </div>
                        <div className="col-xs-4">
                          <h3>35</h3>
                          <p>Goals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="profile-card-4 text-center">
                    <img
                      src="assets\images\customevents\b3.png"
                      className="img img-responsive"
                      alt="Profile"
                      style={{ height: "260px" }}
                    />
                    <div className="profile-content">
                      <div className="profile-name">
                        John Doe<p>@johndoedesigner</p>
                      </div>
                      <div className="profile-description">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="profile-card-4 text-center">
                    <img
                      src="assets\images\customevents\b4.png"
                      style={{ height: "260px" }}
                      className="img img-responsive"
                      alt="Profile"
                    />
                    <div className="profile-content">
                      <div className="profile-name">
                        John Doe<p>@johndoedesigner</p>
                      </div>
                      <div className="profile-description">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                {/* Add content for the fourth card */}
              </div>
            </div>
          </div>
        </div>


        
        
      </div>
    </div>
  );
}

export default EventHome;
