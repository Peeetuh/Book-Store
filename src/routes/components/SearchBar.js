import { useState } from "react";
import { searchRequest } from "../../api"

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const changeHandler = e => {
        setSearchQuery(e.target.value)
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        const result = await searchRequest(searchQuery);
        console.log(result);
    }

    return(
        <form onSubmit={submitHandler}>
        <input type="search" placeholder="Search by title..." onChange={changeHandler}/>
        <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;