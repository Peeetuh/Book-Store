import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchRequest } from "../../api";
import "./SearchBar.css";
import searchicon from "./Images/searchicon.png";

const SearchBar = ({ setSearchResult, setIsLoading }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const changeHandler = (e) => {
    setSearchQuery(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      navigate("./SearchResult");
      const result = await searchRequest(searchQuery);
      console.log(result);
      setSearchResult(result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="elements-container">
        <form onSubmit={submitHandler} className="search-bar">
          <input
            className="input"
            type="search"
            placeholder="Search by title..."
            onChange={changeHandler}
          />
          <button className="search-button" type="submit">
            <img src={searchicon} alt="searchicon" className="search-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
