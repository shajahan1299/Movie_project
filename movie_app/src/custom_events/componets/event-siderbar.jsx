import React, { useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/user/userSlice";

function EventSidebar(props) {

  const navigate = useNavigate();
 
  const dispatch = useDispatch();
  const useremail = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout({ userid: "", useremail: "" }));
    navigate("/", { replace: true });
  };

    useEffect(() => {
        function hideSidebarOnResize() {
          const w = window.innerWidth;
          const sidebar = document.getElementById("sidebar");
          if (w < 1200) {
            sidebar.classList.remove("active");
          } else {
            sidebar.classList.add("active");
          }
        }
        window.addEventListener("resize", hideSidebarOnResize);
        hideSidebarOnResize();
        return () => {
          window.removeEventListener("resize", hideSidebarOnResize);
        };
      }, []);

      
  return (
    <>

    <div id="sidebar" className="active">
      <div className="sidebar-wrapper active" style={{ overflow: "hidden" }}>
        <div className="sidebar-header">
          <div className="d-flex justify-content-between"></div>
        </div>
        <div className="card border-0">
          <div className="card-body py-4 px-5">
            <div className="d-flex align-items-center">
              <div className="avatar avatar-xl">
                <img src="assets/images/faces/2.jpg" alt="Face 1" />
              </div>
              <div className="ms-3 name">
                <h5 className="font-bold">Event Panel</h5>
                <h9 className="text-muted mb-0" style={{ fontSize: "12px" }}>
                  {useremail}{" "}
                </h9>
                <button
                  onClick={() => {
                    
                    const confirmLogout = window.confirm(
                      "Are you sure you want to log out?"
                    );
                    if (confirmLogout) {
                      handleLogout();
                    }
                  }}
                  className="btn btn-danger"
                  style={{
                    width: "130px",
                    height: "30px",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  LogOut
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="sidebar-title">Menu</li>

            <li className={props.dashboard}>
              <Link to="/eventhome">
                <p className="sidebar-link">
                  <i className="bi bi-grid-fill"></i>
                  <span>Dashboard</span>
                </p>
              </Link>
            </li>

            <li className="sidebar-title">Pages</li>
            <Link to="/addnewevent">
              <li className={props.addevent}>
                <a href="application-email.html" className="sidebar-link">
                  <i className="bi bi-envelope-fill"></i>
                  <span>Host New Event</span>
                </a>
              </li>
            </Link>

            <Link to="/myevents">
              <li className={props.myevents}>
                <a href="application-checkout.html" className="sidebar-link">
                  <i className="bi bi-basket-fill"></i>
                  <span>My Events</span>
                </a>
              </li>
            </Link>
            <Link to="/addshortfilm">
              <li className={props.addshortfilm}>
                <a href="application-checkout.html" className="sidebar-link">
                  <i className="bi bi-basket-fill"></i>
                  <span>Publish Films</span>
                </a>
              </li>
            </Link>

            <Link to="/mystreams">
              <li className={props.mystreams}>
                <a href="application-checkout.html" className="sidebar-link">
                  <i className="bi bi-basket-fill"></i>
                  <span>My Streams</span>
                </a>
              </li>
            </Link>

            <li className="sidebar-title">Raise Support</li>
          </ul>
        </div>
        <button className="sidebar-toggler btn x">
          <i data-feather="x"></i>
        </button>
      </div>
    </div>
  </>
  )
}

export default EventSidebar