import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../../config/config";

function UpdateMovie() {
  const location = useLocation();
  const movieid = location.state.movie_id;
  console.log(location.state.movie_id);
  const [file, setFile] = useState(null);

  const [movieUrl, setMovieUrl] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    // Fetch movie details by movieId and populate the form fields
    axios
      .get(`https://movie-backend-1-a9jv.onrender.com/api/movies/${movieid}`)
      .then((response) => {
        console.log(response.data);
        const movieData = response.data[0];
        setValue("title", movieData.title);
        setValue("StreamingType", movieData.StreamingType);
        setValue("genre", movieData.genre);
        setValue("duration", movieData.duration);

        const isoDate = new Date(movieData.release_date);
        const formattedDate = isoDate.toISOString().split("T")[0]; // Format it as "yyyy-MM-dd"
        setValue("release_date", formattedDate);

        setValue("language", movieData.language);
        setValue("description", movieData.description);
        setValue("director", movieData.director);
        setValue("production", movieData.production);
        setValue("cast", movieData.cast);
        setValue("trailer_url", movieData.trailer_url);
        setValue("movie_url", setMovieUrl(movieData.movie_url));
       
      });
  }, [movieid, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("StreamingType", data.StreamingType);
    formData.append("genre", data.genre);
    formData.append("duration", data.duration);
    formData.append("release_date", data.release_date);
    formData.append("language", data.language);
    formData.append("description", data.description);
    formData.append("director", data.director);
    formData.append("production", data.production);
    formData.append("cast", data.cast);
    formData.append("trailer_url", data.trailer_url);
    formData.append("movie_url", movieUrl);
    if (file) {
      formData.append("poster_url", file);
    }

    axios
      .patch(`${baseUrl}/api/update/${movieid}`, formData)
      .then((response) => {
        console.log("Success:", response);
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error");
      });
  };

  const validationRules = {
    title: {
      required: "**Title is required",
      minLength: {
        value: 3,
        message: "**Title must have at least 3 characters",
      },
    },
    genre: {
      required: "**Genre is required",
    },
    StreamingType: {
      required: "**Streaming Type is required",
    },
    duration: {
      required: "**Duration is required",
    },
    release_date: {
      required: "**Release date is required",
    },
    language: {
      required: "**Language is required",
    },
    description: {
      required: "**Description is required",
    },
    director: {
      required: "**Director is required",
    },
    production: {
      required: "**Production is required",
    },
    cast: {
      required: "**Cast is required",
    },
    poster_url: {
      required: "**Poster URL is required",
    },
    trailer_url: {
      required: "**Trailer URL is required",
    },
  };

  return (
    <div style={{ backgroundColor: "#f2f7ff" }}>
      <div id="main">
        <header className="mb-3">
          <p className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </p>
        </header>
        <div className="page-heading">
          <div>
            <h3>Update Movie</h3>
          </div>
        </div>
        <div className="page-content">
          <section id="basic-horizontal-layouts">
            <div className="row match-height">
              <div className="col-12">
                <div className="card">
                  <div className="card-content">
                    <div className="card-body">
                      <form
                        className="form form-horizontal"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="form-body">
                          <div className="row">
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Title</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="title"
                                  {...register("title", validationRules.title)}
                                  placeholder="Movie title"
                                />
                                <p className="text-danger">
                                  {errors?.title && errors.title.message}
                                </p>
                              </div>
                            </div>

                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Duration</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="duration"
                                  placeholder="Movie duration"
                                  {...register(
                                    "duration",
                                    validationRules.duration
                                  )}
                                />
                                <p className="text-danger">
                                  {errors?.duration && errors.duration.message}
                                </p>
                              </div>
                            </div>


                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Streaming Type</label>
                                <select
                                
                                  name="genre"
                                  style={{ border: "2px solid #e9f0f6 ",marginLeft: "30px" }} 
                                  defaultValue=""
                                  {...register(
                                    "StreamingType",
                                    validationRules.StreamingType
                                  )}
                                >
                                  <option value="">Streaming Type</option>
                                  <option value="In-Theaters">
                                    In Theaters Now
                                  </option>
                                  <option value="OTT-Release">
                                    OTT Release
                                  </option>

                                  {/* Add more genre options here */}
                                </select>
                                <p className="text-danger">
                                  {errors?.StreamingType &&
                                    errors.StreamingType.message}
                                </p>
                              </div>
                            </div>

                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Genre</label>
                                <select
                                  style={{ border: "2px solid #e9f0f6 ",marginLeft: "30px" }} 
                                  name="genre"
                                  defaultValue=""
                                  {...register("genre", validationRules.genre)}
                                >
                                  <option value="">Select a genre</option>
                                  <option value="action">Action</option>
                                  <option value="comedy">Comedy</option>
                                  <option value="drama">Drama</option>
                                  <option value="horror">Horror</option>
                                  <option value="thriller">Thriller</option>
                                  <option value="action/drama">
                                    Action/Drama
                                  </option>
                                  <option value="comedy/drama">
                                    Comedy/Drama
                                  </option>
                                  <option value="horror/thriller">
                                    Horror/Thriller
                                  </option>
                                  <option value="sci-fi/fantasy">
                                    Science Fiction/Fantasy
                                  </option>
                                  <option value="romance/drama">
                                    Romance/Drama
                                  </option>
                                  <option value="mystery/thriller">
                                    Mystery/Thriller
                                  </option>
                                  {/* Add more genre options here */}
                                </select>
                                <p className="text-danger">
                                  {errors?.genre && errors.genre.message}
                                </p>
                              </div>
                            </div>
                            
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Release Date</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="release_date"
                                  {...register(
                                    "release_date",
                                    validationRules.release_date
                                  )}
                                  placeholder="Movie release date"
                                />
                                <p className="text-danger">
                                  {errors?.release_date &&
                                    errors.release_date.message}
                                </p>
                              </div>
                            </div>

                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Language</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="language"
                                  placeholder="Movie language"
                                  {...register(
                                    "language",
                                    validationRules.language
                                  )}
                                />
                              </div>
                              <p className="text-danger">
                                {errors?.language && errors.language.message}
                              </p>
                            </div>

                           
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Director</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="director"
                                  {...register(
                                    "director",
                                    validationRules.director
                                  )}
                                  placeholder="Movie director"
                                />
                                <p className="text-danger">
                                  {errors?.director && errors.director.message}
                                </p>
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Production</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="production"
                                  {...register(
                                    "production",
                                    validationRules.production
                                  )}
                                  placeholder="Movie production"
                                />
                                <p className="text-danger">
                                  {errors?.production &&
                                    errors.production.message}
                                </p>
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Cast</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="cast"
                                  {...register("cast", validationRules.cast)}
                                  placeholder="Movie cast"
                                />
                                <p className="text-danger">
                                  {errors?.cast && errors.cast.message}
                                </p>
                              </div>
                            </div>

                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Poster URL</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  name="poster_url"
                                  onChange={(e) => setFile(e.target.files[0])}
                                />
                                <p className="text-danger">
                                  {errors?.poster_url &&
                                    errors.poster_url.message}
                                </p>
                              </div>
                            </div>
                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Trailer URL</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="trailer_url"
                                  {...register(
                                    "trailer_url",
                                    validationRules.trailer_url
                                  )}
                                  placeholder="Movie trailer URL"
                                />
                                <p className="text-danger">
                                  {errors?.trailer_url &&
                                    errors.trailer_url.message}
                                </p>
                              </div>
                            </div>

                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Movie URL</label>
                                <input
                                  type="text"
                                  value={movieUrl} 
                                  className="form-control"
                                  name="movie_url"
                                  onChange={(e)=>{
                                    setMovieUrl(e.target.value);
                                  }}
                                  placeholder="Movie URL"
                                />
                               
                              </div>
                            </div>


                            <div class="col-md-6 col-12">
                              <div class="form-group">
                                <label>Description</label>
                                <textarea
                                  className="form-control"
                                  name="description"
                                  {...register(
                                    "description",
                                    validationRules.description
                                  )}
                                  placeholder="Movie description"
                                ></textarea>
                                <p className="text-danger">
                                  {errors?.description &&
                                    errors.description.message}
                                </p>
                              </div>
                            </div>



                            <div className="col-sm-12 d-flex justify-content-end">
                              <button
                                type="submit"
                                className="btn btn-primary me-1 mb-1"
                              >
                                Update Movie
                              </button>
                              <button
                                type="reset"
                                className="btn btn-light-secondary me-1 mb-1"
                              >
                                Reset
                              </button>
                            </div>
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

export default UpdateMovie;
