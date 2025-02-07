import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/config";
import UserNavBar from "../usernavbar/usernavbar";
import Footer from "../../footer/footer";
import { Card, Button, Row, Col } from "react-bootstrap";
import Maincard from "../componets/moviecards/maincard";
import axios from "axios";
import CommentBox from "./commetbox";
import LikeDislikeButton from "../componets/like-dislike-button";

function UserPlayer() {
  const location = useLocation();
  const movieData = location.state.movieData;
  const mytitle = location.state.movieData.shortfilm_title;
  console.log(movieData);
  const [movies, setMovies] = useState([]);
  const today = new Date();
  const navigate = useNavigate();

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
    <div>
      <UserNavBar />
      <div className="container-fluid mt-3">
        <Row>
          <Col md={9}>
            <Card>
              <Card.Header>
              
                <h3>{movieData.shortfilm_title}</h3>
                <p className="text-muted">
                  {movieData.genre} - {movieData.director} -{" "}
                  {movieData.language}
                </p>
              </Card.Header>
              <Card.Body>
                <ReactPlayer
                  style={{ marginLeft: "80px" }}
                  url={`${baseUrl}/film_videos/${movieData.file_url}`}
                  width="80%"
                  height="auto"
                  controls={true}
                />

              </Card.Body>
              <Card.Footer>
                <Row>
                  <div style={{ marginLeft: "30px" }} >
                    <LikeDislikeButton filmid ={movieData._id}/>
                  </div>
                  <div style={{ margin: "20px" }}>{movieData.description}</div>

                  <Col className="text-end">
                    <small className="text-muted">
                      Released on{" "}
                      {new Date(movieData.release_date).toLocaleDateString()}
                    </small>
                  </Col>
                </Row>
                
              <CommentBox filmid ={movieData._id}/>
              </Card.Footer>

            </Card>

            {/* Movie cards wrapped inside a Card component */}
            <Card className="mt-3">
              <Card.Body>
                <Row className="g-4">
                  {movies
                    .filter((movie) => movie.shortfilm_title !== mytitle)
                    .slice(0, 4)
                    .map((movie, index) => {
                      if (movie.shortfilm_title === mytitle) {
                        return null; // Skip this iteration
                      }

                      const data = { movie };
                      const releaseDate = new Date(movie.release_date);
                      if (releaseDate < today) {
                        return (
                          <Col
                            key={index}
                            md={3}
                            className="mb-4"
                            onClick={() => {
                              navigate("/filmview", { state: data });
                            }}
                          >
                            <Card>
                              <Card.Img
                                variant="top"
                                src={`${baseUrl}/film_poster/${movie.poster_url}`}
                                alt={movie.title}
                                style={{
                                  borderRadius: "10px",
                                  height: "300px",
                                  width: "90%",
                                }}
                              />
                              <Card.Body>
                                <h5 className="card-title">
                                  {movie.shortfilm_title}
                                </h5>
                                <p className="card-text">
                                  <strong>Genre:</strong> {movie.genre}
                                  {releaseDate.toLocaleDateString()}
                                </p>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      }
                    })}
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <div className="mt-3">
              <h5>Recent Movies</h5>

              {movies
                .filter((movie) => movie.shortfilm_title !== mytitle)
                .slice(0, 4)
                .sort(
                  (a, b) => new Date(b.release_date) - new Date(a.release_date)
                )
                .map((movie, index) => {
                  if (movie.shortfilm_title === mytitle) {
                    return null; // Skip this iteration
                  }

                  const data = { movie };
                  const releaseDate = new Date(movie.release_date);
                  if (releaseDate < today) {
                    return (
                      <Card key={index} className="mb-3">
                        <Row>
                          <Col md={5}>
                            <p className="card-text" style={{ margin: "20px" }}>
                              {movie.shortfilm_title}
                              <strong>Genre:</strong> {movie.genre}
                              <br />
                              <strong>Release Date:</strong>{" "}
                              {new Date(
                                movie.release_date
                              ).toLocaleDateString()}
                            </p>
                          </Col>
                          <Col
                            key={index}
                            md={4}
                            className="mb-4"
                            onClick={() => {
                              navigate("/filmview", { state: data });
                            }}
                          >
                            <Card.Img
                              variant="top"
                              src={`${baseUrl}/film_poster/${movie.poster_url}`}
                              alt={movie.title}
                              style={{
                                borderRadius: "10px",
                                height: "170px",
                                width: "130px", // Adjust the width as needed
                                objectFit: "cover",
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                    );
                  }
                  return null; // If the release date condition is not met, skip this iteration
                })}
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default UserPlayer;
