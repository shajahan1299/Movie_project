import React from "react";
import { useLocation } from "react-router-dom";
import UserNavBar from "../../usernavbar/usernavbar";
import Footer from "../../../footer/footer";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import GoBackButton from "../../../public/gobackButton";

function MovieMoreDetails() {
  // Get the movie data from the location state

  const { state } = useLocation();

  const movie = state?.movie;

  return (
    <div>
      <UserNavBar   />
      <GoBackButton />
      {movie && (
        <div className="container mt-5">
          <div className="card">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                  className="img-fluid rounded"
                  style={{ height: "400px" }} // Set the maximum height as per your requirement
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h1 className="card-title">
                    {movie.title}-{movie.original_title}
                  </h1>
                  <p className="card-text">
                    Release Date: {movie.release_date}
                  </p>
                  <p>
                    {movie.original_language === "ml" ? (
                      <>Malayalam</>
                    ) : movie.original_language === "te" ? (
                      <>Telugu</>
                    ) : movie.original_language === "hi" ? (
                      <>Hindi</>
                    ) : movie.original_language === "ta" ? (
                      <>Tamil</>
                    ) :movie.original_language === "kn" ? (
                    <>Kannada</>
                    ):(
                      <>{movie.original_language}</>
                    )}
                  </p>
                  <p className="card-text">Overview: {movie.overview}</p>
                  <p className="card-text">Popularity: {movie.popularity}</p>
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="read-only"
                    value={movie.vote_average / 2}
                    size="large"
                    readOnly
                  />

                  {/* You can display more details here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default MovieMoreDetails;
