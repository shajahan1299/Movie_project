import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReactPlayer from "react-player";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function MyStreams() {
  const [shortFilms, setShortFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return; // Ensure userId is available before making the request
  
    axios
      .get(`${baseUrl}/api/getshortfilms/${userId}`)
      .then((response) => {
        setShortFilms(response.data.shortFilms);
      })
      .catch((error) => {
        console.error("Error fetching short films:", error);
      });
  }, [userId]); // Include userId in the dependency array
  

  const handleClickOpen = (film) => {
    setSelectedFilm(film);
  };

  const handleClose = () => {
    setSelectedFilm(null);
  };

  const handleDelete = (filmId) => {
    // Send a DELETE request to your API to delete the movie
    axios.delete(`${baseUrl}/api/getshortfilms/${filmId}`)
      .then((response) => {
        alert(response.data.message)
        setShortFilms(shortFilms.filter(film => film._id !== filmId));
      })
      .catch((error) => {
        console.error("Error deleting the movie:", error);
      });
  };
  return (
    <div id="main">
      <div className="container mt-5">
        <h2>My Streams</h2>
        <div className="row">
          {shortFilms.length > 0 ? (
            shortFilms.map((shortFilm) => (
              <div className="col-md-3" key={shortFilm._id}>
                <div className="card mb-4">
                  <img
                    src={`${baseUrl}/film_poster/${shortFilm.poster_url}`}
                    className="card-img-top"
                    alt="Poster"
                    style={{ height: "350px" }}
                  />
                  <div className="card-body">
                    <div className="profile-name">
                      <h6>{shortFilm.shortfilm_title}</h6>
                    </div>
                    <div className="profile-position">{shortFilm.genre}</div>
                    <div className="profile-overview">
                      {shortFilm.duration} {shortFilm.language}
                    </div>
                    <Button
                      variant="outlined"
                      onClick={() => handleClickOpen(shortFilm)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(shortFilm._id)}
                    >
                      <DeleteForeverIcon/>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">No events</h5>
                  <p className="card-text">
                    There are currently no short films to display.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={selectedFilm !== null}
        onClose={handleClose}
        aria-labelledby="film-dialog-title"
        aria-describedby="film-dialog-description"
        maxWidth="md" // Adjusted width
      >
        <DialogTitle id="film-dialog-title">
          {selectedFilm?.shortfilm_title}
        </DialogTitle>
        <DialogContent>
          <ReactPlayer
            url={`${baseUrl}/film_videos/${selectedFilm?.file_url}`}
            width="640px"
            height="360px"
            controls={true}
          />
          <DialogContentText id="film-dialog-description">
            <br></br>
            <span className="badge bg-light text-dark">{selectedFilm?.genre} </span>
            
            <span className="badge bg-light text-dark">{selectedFilm?.duration}</span>
            <span className="badge bg-light text-dark">{selectedFilm?.language}</span>
            <br />
            <strong>Director:</strong> {selectedFilm?.director}
            <br />
            <strong>Description:</strong> {selectedFilm?.description}
            <br />
          
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MyStreams;
