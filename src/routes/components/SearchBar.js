import { useState } from "react";

const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";

const SearchBar = () => {
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