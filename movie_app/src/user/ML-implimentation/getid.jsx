import UserNavBar from "../usernavbar/usernavbar";
import Footer from "../../footer/footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TMBDAPI } from "../../config/config";
import { useNavigate } from "react-router-dom";

function GetId() {
    const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [movienames, setMovieNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        if (movienames.length === 0) return; // No need to fetch if no movie names are available
        const moviePromises = movienames.map(async (name) => {
          //console.log(name,"---")
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              name
            )}&language=en-US&page=1&include_adult=false`,
            {
              headers: {
                accept: "application/json",
                Authorization: TMBDAPI,
              },
            }
          );
          return response.data.results;
        });
        const movieResults = await Promise.all(moviePromises);
        //console.log(movieResults.filter(movie => movie !== null))
        setMovies(movieResults.filter((movie) => movie !== null));
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movienames]);

  const handleClick = async () => {
    try {
      if (!searchTerm) return; // Prevent empty search
      setLoading(true); // Set loading to true when starting search
      const response = await axios.post(
        "http://127.0.0.1:8000/recommend_movies/",
        { movie_input: searchTerm }
      );
      setMovieNames(response.data.recommended_movies);
      console.log(response.data.recommended_movies);
      setLoading(false); // Set loading to false after search
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };


  const backgroundImage = `url('assets/background/search.jpg')`;

  return (
    <div>
      <UserNavBar />

      <div
        className="movie-home"
        style={{
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          position: "relative",
          transition: "background-image 1s ease-in-out",
        }}
      >
        {/* Background Overlay */}
        <div className="overlay"></div>

        <div className="container text-white h-100 d-flex flex-column justify-content-center">
          <div className="row" style={{ marginTop: "30px" }}>
            <div className="col-md-8">
              <h1 className="display-4 mb-4 mt-2" style={{ color: "white" }}>
                Movie Management System
              </h1>
              <p className="lead">
                "Experience the ultimate movie management system that simplifies
                your entertainment choices. Discover trending movies, explore
                your favorite genres, and stay up-to-date with the latest
                releases. Stream, organize, and enjoy your cinematic journey
                effortlessly. Welcome to a world of movie magic!"
              </p>
              <span className="ml-3">Explore More</span>
              <div className="mt-4"></div>
              
            </div>
          </div>

          {/* Search Bar ---------------------------------------------*/}
          <div className="row mt-4">
            <div className="col-md-8 mx-auto">
              <div className="input-group">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Enter search term"
                  />
                  <button
                  type="submit"
                    className="btn btn-primary"
                    style={{
                      background: "blue",
                      border: "none",
                      borderRadius: "0px 25px 25px 0px",
                    }}
                    onClick={handleClick}
                  >
                    {" "}
                    <i className="fas fa-search"></i>Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
      {loading && (
        <div  style={{height:"100px"}} className="d-flex justify-content-center mt-5">
          <div  className="spinner-border" role="status">
            <br></br>
            <span className="sr-only">Loading...</span>
            
          </div>
        </div>
      )}

        <div className="container">
          <div className="row row-cols-1 row-cols-md-6 g-4">
            {movies.map((movieArray, arrayIndex) =>
              movieArray.slice(0, 1).map((movie, index) => (
                <div key={arrayIndex * 6 + index} className="col"
                
                onClick={() =>
                    navigate("/exploremore-details", {
                      state: { movie: movie },
                    })
                  }
                >
                  <div className="card mb-3">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://image.tmdb.org/t/p/w500/k3AjjlEH1Rb9YhmTTaHe9lNfECF.jpg";
                      }}
                      className="card-img-top"
                      alt={movie.original_title}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GetId;
