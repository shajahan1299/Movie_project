import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavBar from "../usernavbar/usernavbar";
import { useNavigate } from "react-router-dom";
import UserCarousel from "../componets/Carousel/user_carousel";
import "./../componets/moviecards/sample.css";
import ShortFilmCard from "../componets/Shortfimcard";
import { useMemo } from "react";

function UserHomePage2() {
  const isLoggedInlocal = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://movie-backend-1-a9jv.onrender.com/api/getmovies")
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });

    axios
      .get("https://movie-backend-1-a9jv.onrender.com/api/getallevents")
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    // Filter movies based on the search term
    const filteredMovies = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.language.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredMovies(filteredMovies);
  };

  const trendingMovies = [
    // Replace with your trending movie data
    {
      id: 1,
      title: "Movie 1",
      description: "Description for Movie 1",
      poster: "assets/explore/poster/p1.jpg",
    },

    {
      id: 2,
      title: "Movie 2",
      description: "Description for Movie 2",
      poster: "assets/explore/poster/p2.jpg",
    },
    {
      id: 3,
      title: "Movie 3",
      description: "Description for Movie 3",
      poster: "assets/explore/poster/p3.jpg",
    },
    {
      id: 1,
      title: "Movie 1",
      description: "Description for Movie 1",
      poster: "assets/explore/poster/p6.jpg",
    },
    {
      id: 1,
      title: "Movie 1",
      description: "Description for Movie 1",
      poster: "assets/explore/poster/p5.jpg",
    },
    {
      id: 1,
      title: "Movie 1",
      description: "Description for Movie 1",
      poster: "assets/explore/poster/p4.jpg",
    },
    {
      id: 1,
      title: "Movie 1",
      description: "Description for Movie 1",
      poster: "assets/explore/poster/p3.jpg",
    },
    {
      id: 1,
      title: "Movie 1",
      description: "Description for Movie 1",
      poster: "assets/explore/poster/p7.jpg",
    },
    {
      id: 1,
      title: "Movie 1",
      description: "Description for Movie 1",
      poster: "assets/explore/poster/p8.jpg",
    },

    // Add more movies as needed
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = useMemo(() => [
    "assets/explore/a1.jpg",
    "assets/explore/a2.jpg",
    "assets/explore/a3.jpg",
  ], []);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextImageIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextImageIndex);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [currentImageIndex, images]);

  const backgroundImage = `url('${images[currentImageIndex]}')`;

  return (
    <div>
      {isLoggedInlocal ? (
        <>
          <UserNavBar activehome="active" />
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
                  <h1
                    className="display-4 mb-4 mt-2"
                    style={{ color: "white" }}
                  >
                    Movie Management System
                  </h1>
                  <p className="lead">
                    "Experience the ultimate movie management system that
                    simplifies your entertainment choices. Discover trending
                    movies, explore your favorite genres, and stay up-to-date
                    with the latest releases. Stream, organize, and enjoy your
                    cinematic journey effortlessly. Welcome to a world of movie
                    magic!"
                  </p>
                  <span className="ml-3">Explore More</span>
                  <div className="mt-4"></div>
                </div>
              </div>

              {/* Search Bar ---------------------------------------------*/}
              <div className="row mt-4">
                <div className="col-md-8 mx-auto">
                  <div className="input-group">
                    <input
                      id="serachmymovie"
                      type="text"
                      className="form-control"
                      placeholder="Search for movies..."
                      aria-label="Search for movies"
                      aria-describedby="search-button"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        height: "50px",
                        border: "none",
                        borderRadius: "25px 0px 0px 25px",
                      }}
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <button
                      className="btn btn-primary"
                      type="button"
                      id="search-button"
                      style={{
                        background: "blue",
                        border: "none",
                        borderRadius: "0px 25px 25px 0px",
                      }}
                    >
                      <i className="fas fa-search"></i> Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*------------------------------------------------------------------------------ */}
          <div
            className="container-fluid"
            style={{ paddingLeft: "60px", paddingRight: "60px" }}
          >
            {searchTerm.length > 0 && filteredMovies.length === 0 && (
              <div>No search results found.</div>
            )}

            {searchTerm.length > 0 && filteredMovies.length > 0 && (
              <div
                className="container-fluid"
                style={{ paddingLeft: "60px", paddingRight: "60px" }}
              >
                <section className="mt-5">
                  <div className="row">
                    {filteredMovies.map((movie) => {
                      const data = {
                        movie_id: movie._id,
                        poster_url: `https://movie-backend-1-a9jv.onrender.com/movie_poster/${movie.poster_url}`,
                        title: movie.title,
                        genre: movie.genre,
                        duration: movie.duration,
                        release_date: movie.release_date,
                        director: movie.director,
                        language: movie.language,
                        description: movie.description,
                        production: movie.production,
                        cast: movie.cast,
                        trailer_url: movie.trailer_url,
                        StreamingType: movie.StreamingType,
        
                      };

                      return (
                        <div
                          className="col-lg-2 col-md-4 col-6 mb-4"
                          onClick={() => {
                            navigate("/viewmovie", {
                              state: data,
                            });
                          }}
                          key={movie.id}
                        >
                          <div
                            className="card"
                            style={{
                              transition: "transform 0.2s",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                              overflow: "hidden",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          >
                            <div
                              className="card-img-container"
                              style={{
                                position: "relative",
                                width: "100%",
                                height: "0",
                                paddingTop: "150%",
                              }}
                            >
                              <img
                                src={`https://movie-backend-1-a9jv.onrender.com/movie_poster/${movie.poster_url}`}
                                className="card-img-top movie-poster"
                                alt={movie.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  position: "absolute",
                                  top: "0",
                                  left: "0",
                                  transition: "transform 0.2s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "scale(1.1)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            )}
          </div>
          <div
            className="container-fluid"
            style={{ paddingLeft: "60px", paddingRight: "60px" }}
          >
            <section className="mt-5">
              <h2>Now In Theaters</h2>
              <div className="row">
              {movies.map((movie) => {
  if (movie.StreamingType === "In-Theaters") {
    const data = {
      movie_id: movie._id,
      poster_url: `https://movie-backend-1-a9jv.onrender.com/movie_poster/${movie.poster_url}`,
      title: movie.title,
      genre: movie.genre,
      duration: movie.duration,
      release_date: movie.release_date,
      director: movie.director,
      language: movie.language,
      description: movie.description,
      production: movie.production,
      cast: movie.cast,
      trailer_url: movie.trailer_url,
      StreamingType: movie.StreamingType,
    };

    return (
      <div
        className="col-lg-2 col-md-4 col-6 mb-4"
        onClick={() => {
          navigate("/viewmovie", { state: data });
        }}
        key={movie.id}
      >
        <div
          className="card"
          style={{
            transition: "transform 0.2s",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <div
            className="card-img-container"
            style={{
              position: "relative",
              width: "100%",
              height: "0",
              paddingTop: "150%",
            }}
          >
            <img
              src={`https://movie-backend-1-a9jv.onrender.com/movie_poster/${movie.poster_url}`}
              className="card-img-top movie-poster"
              alt={movie.title}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return null; // ✅ This ensures every case returns something
})}
              </div>
            </section>
          </div>
          <div
            className="container-fluid"
            style={{ paddingLeft: "60px", paddingRight: "60px" }}
          >
            <section className="mt-5">
              <h2>New OTT release</h2>
              <div className="row">
              {movies.map((movie) => {
  const data = {
    movie_id: movie._id,
    poster_url: `https://movie-backend-1-a9jv.onrender.com/movie_poster/${movie.poster_url}`,
    title: movie.title,
    genre: movie.genre,
    duration: movie.duration,
    release_date: movie.release_date,
    director: movie.director,
    language: movie.language,
    description: movie.description,
    production: movie.production,
    cast: movie.cast,
    trailer_url: movie.trailer_url,
    StreamingType: movie.StreamingType,
    movie_url: movie.movie_url,
  };

  if (movie.StreamingType === "OTT-Release") {
    return (
      <div
        className="col-lg-2 col-md-4 col-6 mb-4"
        onClick={() => {
          navigate("/viewmovie", {
            state: data,
          });
        }}
        key={movie._id} // ✅ Ensure key uses `_id` instead of `id`
      >
        <div
          className="card"
          style={{
            transition: "transform 0.2s",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <div
            className="card-img-container"
            style={{
              position: "relative",
              width: "100%",
              height: "0",
              paddingTop: "150%",
            }}
          >
            <img
              src={`https://movie-backend-1-a9jv.onrender.com/movie_poster/${movie.poster_url}`}
              className="card-img-top movie-poster"
              alt={movie.title}
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return null; // ✅ Always return something (null) for non-matching cases
})}
              </div>
            </section>
          </div>
          <ShortFilmCard />
          <div
            className="container-fluid"
            style={{ paddingLeft: "60px", paddingRight: "60px" }}
          >
            <section className="mt-5">
              <h2>OutDoor Events</h2>
              <div className="row">
              {events.map((eventData) => {
  const data = {
    event_id: eventData._id,
    event_name: eventData.event_name,
    event_type: eventData.event_type,
    eventlocation: eventData.location,
    event_date: eventData.event_date,
    event_time: eventData.event_time,
    ticket_price: eventData.ticket_price,
    organizer: eventData.organizer,
    description: eventData.description,
    ticket_availability: eventData.ticket_availability,
    seat_arrangement: eventData.seat_arrangement,
    poster_url: eventData.poster_url,
    status: eventData.status,
    rows: eventData.rows,
    cols: eventData.cols,
    hostname: eventData.userId.hostname,
    contactNumber: eventData.userId.contactNumber,
    hostemail: eventData.userId.email,
  };

  if (!eventData.event_name) return null; // ✅ Always return something for all cases

  return (
    <div
      className="col-lg-2 col-md-4 col-6 mb-4"
      onClick={() => {
        navigate("/view-events", { state: data });
      }}
      key={eventData._id} // ✅ Using `_id` instead of `id` to avoid undefined keys
    >
      <div className="card" style={{ height: "400px", overflow: "hidden" }}>
        <img
          src={`https://movie-backend-1-a9jv.onrender.com/event_poster/${eventData.poster_url}`}
          className="card-img-top"
          alt={eventData.event_name}
          style={{ objectFit: "cover", height: "100%" }}
        />
        <div className="card-body">
          <h5 className="card-title">{eventData.event_name}</h5>
          <p className="card-text">{eventData.event_type}</p>
        </div>
      </div>
    </div>
  );
})}

              </div>
            </section>
          </div>
          ;
          {/*------------------------------------------------------------------------------ */}
          <UserCarousel />
          {/*------------------------------------------------------------------------------ */}
          <div
            className="container-fluid"
            style={{ paddingLeft: "60px", paddingRight: "60px" }}
          >
            <section className="mt-5">
              <h2>Trending Movies</h2>
              <div className="row">
                {trendingMovies.map((movie) => (
                  <div className="col-lg-2 col-md-4 col-6 mb-4" key={movie.id}>
                    <div className="card" style={{ maxHeight: "450px" }}>
                      <img
                        src={movie.poster}
                        className="card-img-top"
                        alt={movie.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">{movie.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      ) : (
        // Content to render when isLoggedInlocal is false
        <p>Please log in locally to access your account.</p>
      )}

      {/*------------------------------------------------------------------------------ */}
    </div>
  );
}

export default UserHomePage2;
