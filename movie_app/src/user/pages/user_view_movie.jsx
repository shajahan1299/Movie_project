import React, { useEffect } from "react";
import axios from "axios";
import UserNavBar from "../usernavbar/usernavbar";
import Maincard from "../componets/moviecards/maincard";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMovie } from "../../Redux/movie/movieSlice";
import { baseUrl } from "../../config/config";
import Footer from "../../footer/footer";
import { toast, Toaster } from "react-hot-toast";
import YouTube from "react-youtube";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UserViewMovie() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation();
  const movie_id = location.state.movie_id;
  const dispatch = useDispatch();
  const releaseDate = new Date(
    location.state.release_date
  ).toLocaleDateString();

  const movieData = location.state;
  dispatch(setMovie(movieData));
  const navigate = useNavigate();

  const saveMovie = async () => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    console.log(movie_id);

    try {
      const response = await axios.post(`${baseUrl}/api/save-movie`, {
        user_id: userId, // Replace with the actual user_id
        movie_id: movie_id,
      });
      console.log(response.data.message);
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        alert("Failed to save movie");
      }
    } catch (error) {
      alert("Error saving movie:", error);
    }
  };

  const [subscriptionPlan, setSubscriptionPlan] = useState('basic');
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchSubscriptionPlan = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/get-my-subscriptions/${userId}`);
            setSubscriptionPlan(response.data.subscription_plan);
            console.log(response.data.subscription_plan);
        } catch (error) {
            console.error('Error fetching subscription plan:', error);
        }
    };
    fetchSubscriptionPlan();
}, []); 


  return (
    <div>
       
      <UserNavBar activehome="active" />

      <div>
        <Toaster />
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <Maincard
              duration={location.state.duration}
              title={location.state.title}
              url={location.state.poster_url}
            />
          </div>
          <div className="col-md-8">
            <br></br>
            <h1 className="mb-3">{location.state.title}</h1>
            <p>
              <strong>Plot Summary:</strong> {location.state.description}
            </p>
            <div class="row">
              <div class="col">
                <p>
                  <strong>Release Date</strong> {releaseDate}
                </p>
                <p>
                  <strong>Director:</strong> {location.state.director}
                </p>
                <p>
                  <strong>Genre:</strong> {location.state.genre}
                </p>
                <p>
                  <strong>language:</strong> {location.state.language}
                </p>
              </div>
              <div class="col">
                <p>
                  <strong>Cast:</strong> {location.state.cast}
                </p>

                <p>
                  <strong>Duration:</strong> {location.state.duration}
                </p>
                <p>
                  <strong>Quality:</strong> HD
                </p>
                <p>
                  <strong>Production House:</strong> {location.state.production}
                </p>
              </div>
            </div>

            <div className="mb-3" style={{ display: "flex" }}>
              {location.state.StreamingType === "In-Theaters" ? (
                <button
                  onClick={() => {
                    navigate("/viewstreaming", {
                      state: {
                        movie_id: movie_id,
                        movieName: location.state.title,
                        language: location.state.language,
                      },
                    });
                  }}
                  className="btn btn-danger btn-lg me-3"
                  style={{ padding: "10px 20px" }}
                >
                  Book Now
                </button>
              ) : (
                <>
                {subscriptionPlan ==="premium"? <>
                
                {location.state.movie_url === undefined ? (
                    <>
                      <Button
                        className="btn btn-danger btn-lg me-3"
                        style={{ padding: "10px 20px" }}
                        onClick={handleShow}
                      >
                        Watch Now
                      </Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Sorry</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          This movie is not available for watching at the moment
                          Please wait to get the movie for online streaming. We
                          apologize for any inconvenience.
                          <br />
                          <br />
                          Team Movie Verse
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate("/watch-movie", {
                            state: {
                              movie_id: movie_id,
                              movieName: location.state.title,
                              language: location.state.language,
                              movie_url: location.state.movie_url,
                            },
                          });
                        }}
                        className="btn btn-danger btn-lg me-3"
                        style={{ padding: "10px 20px" }}
                      >
                        Watch Now
                      </button>
                    </>
                  )}
                
                </> :<>
                <button
                        onClick={() => {
                        
                          navigate("/subscription", {
                           state:{toast:true,
                            msg:"You need Premium Plan to view movie.\nUpdate your plan to enjoy the movie"
                          }
                          });
                        }}
                        className="btn btn-danger btn-lg me-3"
                        style={{ padding: "10px 20px" }}
                      >
                        Watch Now
                      </button>
                </>}
                <>
                  
                </>
                </>
              )}
              <button
                onClick={saveMovie}
                className="btn btn-primary btn-lg me-3"
                style={{ padding: "10px 20px" }}
              >
                Save <BookmarkAddedIcon />{" "}
              </button>
            </div>
          </div>
          <div>
            <YouTube
              videoId={location.state.trailer_url}
              opts={{
                height: "490",
                width: "740",
                playerVars: {
                  autoplay: 0,
                  mute: 1,
                },
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserViewMovie;
