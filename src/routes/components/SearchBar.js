import { useState } from "react";

const SearchBar = () => {
    const [searchString, setSearchString] = useState('');
    const changeHandler = e => {
        setSearchString(e.target.value)
    }
    const submitHandler = e => {
        e.preventDefault();
    }



    return(
        <form onSubmit={}>
        <input type="search" placeholder="Search by title..." onChange={changeHandler}/>
        <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;