import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchBar.css';
import searchicon from "./Images/searchicon.png";

const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";

const SearchBar = ({setSearchResult}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const changeHandler = e => {
        setSearchQuery(e.target.value)
    }

    async function searchRequest(searchstring){
        try{
            const response = await fetch (`${BASE_URL}/search/${searchstring}`,{ //
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            return data;
        } catch(error) {
            console.log(error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        navigate('./SearchResult')
        const result = await searchRequest(searchQuery);
        console.log(result);
        setSearchResult(result);
    }



    return(
        <div className="search-container">
        <div className="elements-container">
        <form onSubmit={submitHandler} className="search-bar">
        <input className="input" type="search" placeholder="Search by title..." onChange={changeHandler}/>
        <button className="search-button" type="submit"><img src={searchicon} alt="searchicon" className="search-icon"/></button>
        </form>
        </div>
        </div>
    );
}

export default SearchBar;