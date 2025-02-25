import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovieIcon from "@mui/icons-material/Movie";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import "../../public/navbar.css";
import SubscriptionsSharpIcon from '@mui/icons-material/SubscriptionsSharp';
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/user/userSlice";
//import LocationPicker from "../componets/LocationPicker";
import { baseUrl } from "../../config/config";
import SearchIcon from '@mui/icons-material/Search';

function UserNavBar(props) {
  const username = localStorage.getItem("name");
  const useremail = localStorage.getItem("email");
  const profilepicture = localStorage.getItem("profilepicture");
  const logintype = localStorage.getItem("logintype");

  console.log("-----", profilepicture);
  //const useremail = useSelector((state) => state.user.useremail);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout({ userid: "", useremail: "" }));
    navigate("/", { replace: true }, { redirect: true });
  };

  const headerStyle = {
    background: "linear-gradient(to left,#212529 ,#212529 )", // Adjust the colors as needed
    color: "white",
  };

  return (
    <header className="" style={headerStyle}>
      <nav
        className="navbar"
        style={{ paddingLeft: "50px", paddingRight: "50px" }}
      >
        <ul className="nav-list">
          <Link to="/userhome">
            <li
              style={{ color: "white" }}
              className={`nav-item ${props.activehome}`}
            >
              Home
            </li>
          </Link>

          <Link to="/userabout">
            <li
              style={{ color: "white" }}
              className={`nav-item ${props.activeabout}`}
            >
              About Us
            </li>
          </Link>

          <Link to="/exploremore">
            <li
              style={{ color: "white" }}
              className={`nav-item ${props.a}`}
            >
              Explore More
            </li>
          </Link>

          <Link to="/userprofile">
            <li
              id="viewpro"
              style={{ color: "white" }}
              className={`nav-item ${props.activep}`}
            >
              My Profile
            </li>
          </Link>

          <div style={{ width: "40px" }}></div>

          {/* <LocationPicker /> */}
        </ul>

        <nav className="navbar navbar-expand navbar-light ">
          <div className="container-fluid">
            <div style={{ padding: "20px" }}>
              <Link to="/subscription">
              <SubscriptionsSharpIcon />
              </Link>
            </div>
            <Link to="/favmovies">
            <div style={{ padding: "20px" }}>
              <BookmarkBorderIcon />
            </div>
            </Link>
         
            <Link to="/id">
            <div style={{ padding: "20px" }}>
            <SearchIcon/>
            </div>
            </Link>
          </div>
          <div className="user-menu d-flex">
            <div style={{ paddingRight: "20px" }}>
              <Dropdown alignRight>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <div className="user-img d-flex align-items-center">
                    <div className="user-name text-start me-3">
                      <h6 style={{ color: "white", fontSize: "15px" }}>
                        {username}
                      </h6>
                      <p className="mb-0 text-sm text-white-600">{useremail}</p>
                    </div>
                    <div className="avatar avatar-md">
                    <img
  src={
    profilepicture === "false"
      ? "assets/images/faces/4.jpg"
      : logintype === "googleauth"
      ? profilepicture
      : `${baseUrl}/profile_picture/${profilepicture}`
  }
  alt="User profile"
  className="rounded-circle"
/>

                    </div>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    minWidth: "200px",
                    border: "1px solid #ccc",
                    backgroundColor: "#fdfdfd",
                  }}
                >
                  <Dropdown.Item style={{ color: "blue" }}>
                    <Link to="/userprofile">
                      <AccountCircleIcon /> View Profile
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item style={{ color: "green" }}>
                    <div id="mybooking">
                      <Link to="/mybookings">
                        <MovieIcon /> My Bookings
                      </Link>
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item style={{ color: "red" }}>
                    <Link to="/favmovies">
                      <CollectionsBookmarkIcon /> Saved Collection
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleLogout()}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </nav>
      </nav>
    </header>
  );
}

export default UserNavBar;
