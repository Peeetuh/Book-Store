import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import searchicon from "./Images/searchicon.png";

const SearchBar = ({ setSearchQuery, setIsLoading }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setQuery(e.target.value);
  };
  const clickHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setSearchQuery(query || "no-search-parameters-given");
      navigate("./SearchResult");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="elements-container">
        <form className="search-bar">
          <input className="input" type="search" onChange={changeHandler} />
          <button className="search-button" onClick={clickHandler}>
            <img src={searchicon} alt="searchicon" className="search-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
