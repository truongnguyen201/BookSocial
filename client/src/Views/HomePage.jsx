import React from "react";
import News from "../components/News/News";
import NavBar from "../NavBar/NavBar";

const HomePage = () => {
  return (
    <div className="HomePage">
      <NavBar></NavBar>
      <News></News>
    </div>
  );
};

export default HomePage;
