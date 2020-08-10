import React, { useState, useRef, useEffect } from "react";
import Logo from "../img/Logo.png";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions";
import AvatarIcon from "../img/profile.svg";
import ClassNames from "classnames";

const NavBar = () => {
  const dispatch = useDispatch();

  //func below helps delete dropdown content when click outside dropdown this code is onstackoverflow and I not really dont understand it
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropDown(false);
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [showDropDown, setShowDropDown] = useState(false);
  let dropdownclassname = showDropDown
    ? ClassNames("dropdown-content show")
    : "dropdown-content";

  return (
    <div className="Nav-bar">
      <div className="logo">
        <img src={Logo} alt="Logo" height="50px" width="auto"></img>
      </div>
      <div className="Home">
        <Link to="/" style={{ textDecoration: "none", color: "#302579" }}>
          Home
        </Link>
      </div>
      <div className="Notification">
        <div>Notification</div>
      </div>
      <SearchBar></SearchBar>
      <div className="Profile" ref={wrapperRef}>
        <div className="AvatarIcon" onClick={() => setShowDropDown(true)}>
          <img src={AvatarIcon} alt="icon" height="30px" width="30px"></img>
        </div>
        <div className={dropdownclassname}>
          <div>
            <Link
              to={{
                pathname: `/profile/${localStorage.getItem("fullname")}/main`,
                state: {
                  fullname: localStorage.getItem("fullname"),
                  id: localStorage.getItem("id"),
                },
              }}
              style={{ textDecoration: "none" }}
            >
              Profile
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                localStorage.removeItem("username");
              }}
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
