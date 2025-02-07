import React, { useState, useEffect } from "react";
import Footer from "../../footer/footer";
import UserNavBar from "../usernavbar/usernavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/config";
import Maincard from "../componets/moviecards/maincard";
import axios from "axios";

function UserMyFilm() {
    const navigate = useNavigate();
    const location = useLocation();
    const movieData = location.state ? location.state.movie : null;
    const releaseDate = movieData ? new Date(movieData.release_date) : null;
    const isReleased = releaseDate && releaseDate <= new Date();
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const difference = releaseDate - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  useEffect(() => {
    if (!isReleased) {
      const timerId = setInterval(() => {
        setTimeRemaining(getTimeRemaining());
      }, 1000);

      // Clear the interval when the component is unmounted
      return () => clearInterval(timerId);
    }
  }, [isReleased]);


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




  if (!movieData) {
    // Handle case when movieData is not available
    return (
      <div>
        <UserNavBar />
        <div className="container mt-5 text-center">
          <p>No movie data available.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <UserNavBar />

      <div className="container mt-5">
        <div className="row">
          {!isReleased && (
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              <strong>
                Count Down:
                <br />
              </strong>{" "}
              {timeRemaining.days > 0 && `${timeRemaining.days} days, `}
              {timeRemaining.hours > 0 && `${timeRemaining.hours} hours, `}
              {timeRemaining.minutes > 0 &&
                `${timeRemaining.minutes} minutes, `}
              {timeRemaining.seconds > 0 && `${timeRemaining.seconds} seconds`}
            </p>
          )}

          <div className="col-md-4">
            <Maincard
              duration={movieData.genre}
              title={movieData.title}
              url={`${baseUrl}/film_poster/${movieData.poster_url}`}
            />
          </div>
          <div className="col-md-8">
            <h2>{movieData.shortfilm_title}</h2>
            <p>
              <strong>Description:</strong> {movieData.description}
            </p>
            <p>
              <strong>Genre:</strong> {movieData.genre}
            </p>
            <p>
              <strong>Director:</strong> {movieData.director}
            </p>
            <p>
              <strong>Duration:</strong> {movieData.duration}
            </p>
            <p>
              <strong>Language:</strong> {movieData.language}
            </p>

            <p>
              <strong>Release Date:</strong>{" "}
              {new Date(movieData.release_date).toLocaleDateString()}
            </p>
            {/* Display the countdown timer */}

            <div className="my-3">

{subscriptionPlan ==="premium" || subscriptionPlan ==='standard' ? <>
<button
                className="btn btn-danger me-3"
                onClick={() => {
                  navigate("/play-my-movie", {
                    state: { movieData },
                  });
                }}
                disabled={!isReleased} // Disable the button if the movie is not released
              >
                Watch Now
              </button>
</>:<>
<button
                className="btn btn-danger me-3"
                onClick={() => {
                        
                  navigate("/subscription", {
                   state:{toast:true,
                  msg:"You need Standard Plan to view movie.\nUpdate your plan to enjoy the movie"
                  }
                  });
                }}
                disabled={!isReleased} // Disable the button if the movie is not released
              >
                Watch Now
              </button></>}
<>
              
              </>




           
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <Footer />
    </>
  );
}

export default UserMyFilm;
