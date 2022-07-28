import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchRequest } from "../../api"

const SearchBar = ({setSearchResult}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const changeHandler = e => {
        setSearchQuery(e.target.value)
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        navigate('./SearchResult')
        const result = await searchRequest(searchQuery);
        console.log(result);
        setSearchResult(result);
    }

    return(
        <div>
        <form onSubmit={submitHandler}>
        <input type="search" placeholder="Search by title..." onChange={changeHandler}/>
        <button type="submit">Search</button>
        </form>
        </div>
    );
}

export default SearchBar;