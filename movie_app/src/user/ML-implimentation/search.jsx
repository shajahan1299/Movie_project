import UserNavBar from "../usernavbar/usernavbar";
import Footer from "../../footer/footer";
import axios from "axios";
import React, { useState, useEffect } from "react";

function SearchMovies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [response, setResponse] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/recommend_movies/",
        { movie_input: searchTerm }
      );
      setResponse(response.data.recommended_movies);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <UserNavBar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Enter search term"
              />
              <button className="btn btn-primary" onClick={handleClick}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          {response.map((movie, index) => (
            <div key={index} className="col-md-4 card">
              <p> {movie}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SearchMovies;
