import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import "./Burger.css";



const Burger = ({token}) => {
const [navbarOpen, setNavBarOpen] = useState(false);


const closeMenu = () => {
    setNavBarOpen(false)
    return(
        <button>X</button>
    )
}
const handleToggle = () => {
    setNavBarOpen(!navbarOpen)
}

    return(
        <div>
        <button className="burger-btn" onClick={handleToggle}>
        {navbarOpen ? (
     <MdClose className="close-btn" style={{ color: "#fff", width: "40px", height: "40px" }} />
      ) : (
      <FiMenu style={{ color: "#fff", width: "40px", height: "40px" }} />
      )}
        </button>
        <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <li >
                 <Link
                  to="/"
                  className="active-link"
                  onClick={() => closeMenu()}
                  >
                 Home
                  </Link>
            </li>
            <li>
                <Link 
                to="/Genres"
                className="active-link"
                  onClick={() => closeMenu()}
                  
                >
                 Genres
                </Link>
            </li>
            <li>
                {token ? null : (
                <Link
                to="/Login"
                className="active-link"
                onClick={() => closeMenu()}
                >
                Login
                </Link>
                )}
            </li>
            {token ? null : (
                <Link 
                to="/Register"
                className="active-link"
                onClick={() => closeMenu()}
                >
                 Register
                </Link>
            )}
            <li>
            {token ? (
                <Link
                to="/MyAccount"
                className="active-link"
                onClick={() => closeMenu()}
                >
                My Account
                </Link>
                ) : null}
            </li>

            <li>
            {token ? (
                <Link
                className="active-link"
                to="/logout">
                    Logout
                </Link>
            ) : null}
            </li>

        </ul>
        </div>
    )
};

export default Burger;

