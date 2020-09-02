import React, { useState, useRef, useEffect } from "react";
import Logo from "../img/Logo.png";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions";
import AvatarIcon from "../img/profile.svg";
import ClassNames from "classnames";

const NavBar = () => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.UserProfile);

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
      </div>{" "}
      <Link
        to="/"
        style={{ textDecoration: "none", color: "#302579", height: "100%" }}
      >
        <div className="Home">Home</div>{" "}
      </Link>
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
                pathname: `/profile/${userProfile.user.fullname}/main`,
                state: {
                  fullname: userProfile.user.fullname,
                  id: userProfile.user._id,
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
