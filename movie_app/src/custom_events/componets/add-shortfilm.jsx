import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';

function AddShortFilm() {
  const [file, setFile] = useState(null);
  const [Videofile, setVideoFile] = useState(null);
  const userId = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validationRules = {
    shortfilm_title: {
      required: "Short Film Title is required",
      minLength: {
        value: 2,
        message: "Short Film Title must have at least 2 characters",
      },
    },
    genre: {
      required: "Genre is required",
    },
    director: {
      required: "Director is required",
    },
    release_date: {
      required: "Release Date is required",
    },
    duration: {
      required: "Duration is required",
    },
    description: {
      required: "Description is required",
    },
    language: {
      required: "language is required",
    },
    poster_url: {
      required: "Poster URL is required",
    },
    file_url: {
      required: "File URL is required",
    },
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("shortfilm_title", data.shortfilm_title);
    formData.append("genre", data.genre);
    formData.append("director", data.director);
    formData.append("release_date", data.release_date);
    formData.append("duration", data.duration);
    formData.append("description", data.description);
    formData.append("language", data.language);
    if (file) {
      formData.append("poster_url", file); // Append the image file
    } else {
      alert("Poster URL is required");
      return; // Stop execution if poster_url is empty
    }
    if (Videofile) {
      formData.append("file_url", Videofile); // Append the video file
    } else {
      alert("Video file is required");
      return; // Stop execution if file_url is empty
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // Send data using Axios
    axios
      .post("https://movie-backend-1-a9jv.onrender.com/api/addshortfilm", formData)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        alert("Submitted successfully");
        // Handle success
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error occurred while submitting");
        // Handle error
      });
  };

  return (
    <div style={{ backgroundColor: "#f2f7ff" }}>
            <div><Toaster/></div>
      <div id="main">
        <header className="mb-3">
          <p className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </p>
        </header>
        <div className="page-heading">
          <div>
            <h3>Add Film</h3>
          </div>
        </div>
        <div className="page-content">
          <section id="multiple-column-form">
            <div className="row match-height">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-eventname">
                      Add new Film using below form
                    </h4>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <form
                        className="form form-horizontal"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="form-body">
                          <div className="row">
                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>Title</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="shortfilm_title"
                                  {...register(
                                    "shortfilm_title",
                                    validationRules.shortfilm_title
                                  )}
                                  placeholder="Short Film Title" // Update placeholder text
                                />
                                {errors.shortfilm_title && (
                                  <p className="text-danger">
                                    {errors.shortfilm_title.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>Short Film Genre</label>
                                <select
                                  className="btn dropdown-toggle dropdown-toggle-split"
                                  name="genre"
                                  defaultValue=""
                                  {...register("genre", validationRules.genre)}
                                >
                                  <option value="">Select Genre</option>
                                  <option value="Action">Action</option>
                                  <option value="Adventure">Adventure</option>
                                  <option value="Comedy">Comedy</option>
                                  <option value="Drama">Drama</option>
                                  <option value="Fantasy">Fantasy</option>
                                  <option value="Horror">Horror</option>
                                  <option value="Mystery">Mystery</option>
                                  <option value="Romance">Romance</option>
                                  <option value="Sci-Fi">Sci-Fi</option>
                                  <option value="Thriller">Thriller</option>
                                  <option value="Animation">Animation</option>
                                  <option value="Documentary">
                                    Documentary
                                  </option>
                                  <option value="Experimental">
                                    Experimental
                                  </option>
                                </select>
                                {errors.genre && (
                                  <p className="text-danger">
                                    {errors.genre.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>Director</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="director"
                                  {...register(
                                    "director",
                                    validationRules.director
                                  )}
                                  placeholder="Director"
                                />
                                {errors.director && (
                                  <p className="text-danger">
                                    {errors.director.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>Release Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="release_date"
                                  {...register(
                                    "release_date",
                                    validationRules.release_date
                                  )}
                                />
                                {errors.release_date && (
                                  <p className="text-danger">
                                    {errors.release_date.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>Language</label>
                                <input
                                  type="text"
                                  placeholder="Language"
                                  className="form-control"
                                  name="language"
                                  {...register(
                                    "language",
                                    validationRules.language
                                  )}
                                />
                                {errors.language && (
                                  <p className="text-danger">
                                    {errors.language.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>Duration</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="duration"
                                  placeholder="Duration"
                                  {...register(
                                    "duration",
                                    validationRules.duration
                                  )}
                                />
                                {errors.duration && (
                                  <p className="text-danger">
                                    {errors.duration.message}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>Description</label>
                                <textarea
                                  className="form-control"
                                  name="description"
                                  {...register(
                                    "description",
                                    validationRules.description
                                  )}
                                  placeholder="Description"
                                ></textarea>
                                {errors.description && (
                                  <p className="text-danger">
                                    {errors.description.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>Poster URL</label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="form-control"
                                  name="poster_url"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    const allowedTypes = [
                                      "image/jpeg",
                                      "image/png",
                                      "image/gif",
                                    ]; // Add more image types if needed
                                    if (allowedTypes.includes(file.type)) {
                                      setFile(file);
                                    } else {
                                      // Display an error message or handle invalid file type
                                      toast.error("Invalid file type. Please select an image file.")
                                      setFile(null);
                                    }
                                  }}
                                />
                                {errors.poster_url && (
                                  <p className="text-danger">
                                    {errors.poster_url.message}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="col-md-6 col-12">
                              <div className="form-group">
                                <label>File URL</label>
                                <input
                                  type="file"
                                  accept="video/*"
                                  className="form-control"
                                  name="file_url"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    const allowedTypes = [
                                      "video/mp4",
                                      "video/webm",
                                      "video/ogg",
                                    ]; // Add more video types if needed
                                    if (allowedTypes.includes(file.type)) {
                                      setVideoFile(file);
                                    } else {
                                      // Display an error message or handle invalid file type
                                 
                                      toast.error( "Invalid file type. Please select a video file.")
                                      setVideoFile(null);
                                   
                                    }
                                  }}
                                />
                                {errors.file_url && (
                                  <p className="text-danger">
                                    {errors.file_url.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12 d-flex justify-content-end">
                            <button
                              type="submit"
                              className="btn btn-primary me-1 mb-1"
                            >
                              Submit
                            </button>
                            <button
                              type="reset"
                              className="btn btn-light-secondary me-1 mb-1"
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default AddShortFilm;
