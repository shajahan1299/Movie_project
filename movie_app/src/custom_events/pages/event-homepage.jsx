
import React from "react";
//import { Link, useNavigate } from "react-router-dom";
//import { useDispatch } from "react-redux";
import EventSidebar from "../componets/event-siderbar";
import EventHome from "../componets/event-home";


function EventHomeDashPage(props) {
  return (
    <>
    <EventSidebar dashboard={"sidebar-item active"} />
    <EventHome/>
    </>
  )
}

export default EventHomeDashPage