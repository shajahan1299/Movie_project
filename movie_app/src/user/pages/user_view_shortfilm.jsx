import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import GoBackButton from "../../public/gobackButton";
import { useNavigate } from "react-router-dom";
import UserNavBar from "../usernavbar/usernavbar";
import { toast, Toaster } from "react-hot-toast";

function UserViewShortFilm() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [movies, setMovies] = useState([]);
  const [rf, setrf] = useState(true);
  const today = new Date();

  console.log(today);

  useEffect(() => {
    // Fetch data from your API endpoint
    axios
      .get(`${baseUrl}/api/getshortfilms`)
      .then((response) => {
        // Update the shortFilms state with the fetched data
        setMovies(response.data.shortFilms);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching short films:", error);
      });
  }, []);

  return (
    <>
      <UserNavBar />
      <div>
        <GoBackButton />
        <Toaster />
      </div>
      <div className="container mt-5">
        {movies.length === 0 ? (
          <div className="card ">
            <div className="card-body">
              <h5 className="card-title">No movies found</h5>
              <p className="card-text">
                It looks like you haven't added any movies to your favorites
                yet. Explore our collection and start adding your favorite
                movies!
              </p>
            </div>
          </div>
        ) : (
          <>
            <h3>Trending Now</h3>
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {movies.map((movie, index) => {
                const data = {
                  movie,
                };
                const releaseDate = new Date(movie.release_date);
                if (releaseDate < today) {
                  return (
                    <div
                      key={index}
                      className="col"
                      onClick={() => {
                        navigate("/filmview", {
                          state: data,
                        });
                      }}
                    >
                      <div className="card">
                        <img
                          src={`${baseUrl}/film_poster/${movie.poster_url}`}
                          alt={movie.title}
                          className="card-img-top"
                          style={{
                            margin:"10px",
                            borderRadius: "10px",
                            height: "300px",
                            width: "220px",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {movie.shortfilm_title}
                          </h5>
                          <p className="card-text">
                            <strong>Genre:</strong> {movie.genre}
                           
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <h3>Comiing Soon</h3>
            <div className="row row-cols-1 row-cols-md-5 g-4">
          
              {movies.map((movie, index) => {
                const data = {
                  movie,
                };
                const releaseDate = new Date(movie.release_date);
                if (releaseDate > today) {
                  return (<>
                   
                    <div
                      key={index}
                      className="col"
                      onClick={() => {
                        navigate("/filmview", {
                          state: data,
                        });
                      }}
                    >
                      <div className="card">
                        <img
                          src={`${baseUrl}/film_poster/${movie.poster_url}`}
                          alt={movie.title}
                          className="card-img-top"
                          style={{
                            margin:"10px",
                            borderRadius: "10px",
                            height: "300px",
                            width: "220px",
                          }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {movie.shortfilm_title}
                          </h5>
                          <p className="card-text">
                            <strong>Genre:</strong> {movie.genre}
                           
                          </p>
                        </div>
                      </div>
                    </div>
                    </>
                  );
                }
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default UserViewShortFilm;
