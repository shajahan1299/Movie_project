import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../footer/footer";
import UserNavBar from "../../usernavbar/usernavbar";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../../public/gobackButton";
import { TMBDAPI } from "../../../config/config";
import { usePage } from "../../../config/PageContext";


function ExploreHome() {
  const navigate = useNavigate();
  const { page, setPage, selectedLanguage, setSelectedLanguage } = usePage();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Memoized fetchData function to prevent unnecessary re-creations
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_original_language=${selectedLanguage}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: TMBDAPI,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (!data || !data.results || !Array.isArray(data.results)) {
        throw new Error("Invalid data format or empty results");
      }
      setUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, selectedLanguage]); // Dependencies

  // Call fetchData when page or selectedLanguage changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const NextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const PreviewsPage = () => {
    setPage((prevPage) => {
      if (prevPage > 1) {
        return prevPage - 1;
      } else {
        // If prevPage is already 0 or negative, return prevPage itself
        return prevPage;
      }
    });
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setPage(1); // Reset page when language changes
  };

  return (
    <div>
      <UserNavBar a="active"  />
      <br />
      <GoBackButton />
      {isLoading ? (
        <>
          <div
            className="card-body d-flex justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <div
              className="spinner-border spinner-border-lg text-danger"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <h3>Hit Movies</h3>
            <nav aria-label="...">
              <div className="row align-items-center">
                <div className="col-md-9">
                  <ul className="pagination">
                    <li
                      className="page-item"
                      onClick={PreviewsPage}
                      style={{ cursor: "pointer" }}
                    >
                    <Link to="/previous-page" className="page-link">Previous</Link>
                    </li>

                    <li className="page-item active">
                    <Link to={`/page/${page}`} className="page-link">
                        {page} <span className="sr-only"></span>
                      </Link>
                    </li>

                    <li
                      className="page-item"
                      onClick={NextPage}
                      style={{ cursor: "pointer" }}
                    >
                      <Link to="/next-page" className="page-link">Next</Link>
                    </li>
                  </ul>
                </div>

                <div className="col-md-3">
                  <div className="mb-3">
                    <label htmlFor="languageSelect" className="form-label">
                      Select Language:
                    </label>
                    <select
                      className="form-select"
                      id="languageSelect"
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                    >
                      <option value="ml">Malayalam</option>
                      <option value="te">Telugu</option>
                      <option value="ta">Tamil</option>
                      <option value="hi">Hindi</option>
                      <option value="kn">Kannada</option>
                    </select>
                  </div>
                </div>
              </div>
            </nav>

            <div className="row">
              {userData &&
                userData.results.map((movie, index) => (
                  <div
                    style={{ cursor: "pointer" }}
                    className="col-md-2 mb-2"
                    key={index}
                    onClick={() =>
                      navigate("/exploremore-details", {
                        state: { movie: movie },
                      })
                    }
                  >
                    <div className="card">
                      {isLoading ? (
                        <div className="card-body">
                          <div
                            className="spinner-border text-danger"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default ExploreHome;