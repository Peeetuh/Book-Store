import React, { useState } from "react";
import './SearchBar.css';
// const APIURL = `https://sensationnel-maison-12931.herokuapp.com`


function FilteredSearchBar ({placeholder, data}) {
  console.log(data);
    const [filteredData, setFilteredData] = useState([]);
    const myData = data.booksData
    const handleFilter = (event) => {
      const searchWord = event.target.value
      const newFilter = myData.filter((value) => {
        return value.bookTitle.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
        setFilteredData([])
      } else {
        setFilteredData(newFilter);
      }
      setFilteredData(newFilter);
    }
    return (
        <div className="search">
          <div className="searchInputs">
            <input type="text" placeholder={placeholder} onChange={handleFilter}/>
          </div>
            {filteredData.length !==0 && (
                <div className="dataResult">
            {filteredData.slice(0, 10).map((value, key) => {
            return (
               <a className="dataItem" href={value.ImageLinkL}>
                <p>{value.bookTitle}</p>
                </a>
            );
          })}
          </div>
          )}
        </div>
      );
    }

export default FilteredSearchBar;
























// import axios from 'axios';
// import React, { useState, useEffect } from "react";

// import SearchIcon from '@material-ui/icons/Search';


// //sample fetch
// function Posts() {
//   const [APIdata, setAPIData] = useState=([])
//   const [searchTerm, setSearchTerm] = useState('')
//   useEffect(() => {
//     axios.get(`https://jsonplaceholder.typicode.com/users`)
//         .then((response) => {
//           setAPIData(response.data);
//         })
//       }, [])


// export default function SearchBar({ placeholder }) {
//     return (
//       <div className="search">
//         <div className="searchInputs">
//         <input type="text" placeholder={placeholder}/>
//         <div className="searchIcon"> <SearchIcon /> </div>
//       </div>
//       <div className="dataResult"></div>
//       </div>
//     );
//   }