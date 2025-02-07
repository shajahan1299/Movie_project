import React, { useState } from 'react';
import UserNavBar from '../usernavbar/usernavbar';
import Footer from '../../footer/footer';
import { useLocation } from 'react-router-dom';
import GoBackButton from '../../public/gobackButton';

function WatchMovies() {
  const location = useLocation();
  const { movie_id, movieName, language } = location.state;
  console.log(location.state)
  const movie_url = location.state.movie_url
  const [loading, setLoading] = useState(true);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  return (
    <div>
      <UserNavBar />
      <div className="container mt-5">
        <GoBackButton/>
        <h2 className="mb-4">{movieName}-{language}</h2>
      
        {loading && (
          <div className="text-center" style={{margin:"200px"}}>
            <div className="spinner-border"  role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className={`embed-responsive embed-responsive-16by9 ${loading ? 'd-none' : ''}`}>
          <iframe
            className="embed-responsive-item"
            title="Drive Video"
            src={movie_url}
            allowFullScreen
            width="800" // Adjust width as needed
            height="450" // Adjust height as needed
            onLoad={handleVideoLoad}
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WatchMovies;
