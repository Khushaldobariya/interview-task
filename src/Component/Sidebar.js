import React from "react"; 
import comapanyLogo from "../Component/imges/comapanyLogo.png"


const Sidebar = () => {
  return (
    <>
      <div class="sidebar">
        <div class="logo">
          <img src={comapanyLogo} alt="Company Logo" />
        </div>
        <div class="dropdown">
          <button class="dropbtn">List Component</button>
          <div class="dropdown-content">
            <a href="#">Website 1</a>
            <a href="#">Website 2</a>
            <a href="#">Website 3</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
