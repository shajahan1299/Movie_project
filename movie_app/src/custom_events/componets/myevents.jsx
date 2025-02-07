import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import GoBackButton from "../../public/gobackButton";
import Viewscreenorientation from "../../theater/componets/viewscreenorientation";
import { useNavigate } from "react-router-dom";

function AdminViewPostedMovies() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const userid = localStorage.getItem("userId");

  useEffect(() => {
    if (userid) {
      axios.get(`http://localhost:5000/api/geteventbyid/${userid}`)
        .then(response => {
          setEvents(response.data);
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userid]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div id="main">
      <div className="container mt-5">
        <h2>My Events</h2>
        <GoBackButton />
        {events.length === 0 ? (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">No Events Hosted</h5>
              <p className="card-text">You have not hosted any events yet.</p>
            </div>
          </div>
        ) : (
          events.map((event, index) => {
            const eventdate = new Date(event.event_date).toLocaleDateString();

            return (
              <div className="card mb-3" key={index}>
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="card-body">
                      <span
                        className={`badge ${new Date(eventdate) < new Date() ? 'bg-danger' : 'bg-warning'}`}
                        style={{ position: "absolute", top: "10px", right: "10px", fontSize: "14px" }}
                      >
                        {new Date(eventdate) < new Date() ? 'Expired' : 'Coming soon'}
                      </span>
                      <h2 className="card-title">{event.event_name}</h2>
                      <div className="row">
                        <div className="col">
                          <p className="card-text">
                            <strong>Type:</strong> {event.event_type}
                          </p>
                          <p className="card-text">
                            <strong>Price:</strong> ${event.ticket_price}
                          </p>
                        </div>
                        <div className="col">
                          <p className="card-text">
                            <strong>Date:</strong> {eventdate}
                            {new Date(eventdate) < new Date() ? (
                              <span className="text-danger"> (Event Expired)</span>
                            ) : null}
                          </p>
                          <p className="card-text">
                            <strong>Time:</strong> {event.event_time}
                          </p>
                        </div>
                      </div>
                      <p className="card-text">
                        <strong>Description:</strong> {event.description}
                      </p>
                      <p className="card-text">
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p className="card-text">
                        <strong>Ticket Availability:</strong> {event.ticket_availability === 0 ? "Not Available" : event.ticket_availability}
                      </p>
                      <p className="card-text">
                        <strong>Seat Arrangement:</strong>{" "}
                        {event.seat_arrangement === "no" ? "Arrangement Not Available" : <button
                          type="button"
                          className="btn btn-outline-danger"
                          data-bs-toggle="modal"
                          data-bs-target={`#seatArrangementModal${index}`}
                          style={{ marginRight: "20px" }}
                        >
                          View Arrangement
                        </button>}
                      </p>
                     
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img
                      src={`${baseUrl}/event_poster/${event.poster_url}`}
                      alt={event.event_name}
                      style={{
                        height: "290px",
                        maxWidth: "200px",
                        margin: "30px",
                        borderRadius: "10px",
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.14)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </div>
                  <div className="row">
                    <div className="col align-self-start">
                      <button type="button" onClick={() => {
                        navigate('/updateevents', { state: event })
                      }} className="btn btn-primary block">Update </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal for Seating Arrangement */}
      {events.map((event, index) => (
        <div
          className="modal fade"
          id={`seatArrangementModal${index}`}
          key={index}
          tabIndex="-1"
          aria-labelledby={`seatArrangementModalLabel${index}`}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={`seatArrangementModalLabel${index}`}>
                  Seating Arrangement - {event.event_name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Viewscreenorientation
                  title={"Event Seating Arrangement"}
                  rows={event.rows}
                  cols={event.cols}
                  orientationProp={event.seat_arrangement}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminViewPostedMovies;
