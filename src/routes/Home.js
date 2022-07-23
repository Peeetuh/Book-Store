import { useEffect, useState } from "react";
import DisplayCuratedRanking from "./components/DisplayCuratedRanking";
import DisplayHighestRanking from "./components/DisplayHighestRanking";
import DisplayFeatured from "./components/DisplayFeatured";

function Home() {
  const [topCuratedRanking, setTopCuratedRanking] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [featured, setFeatured] = useState([]);

    const BASE_URL = "https://sensationnel-maison-12931.herokuapp.com/api";
    const requestCuratedRanking = async () => {
      const response = await fetch(`${BASE_URL}/books/lists/curated-rankings`,{
        headers: {
          "Content-Type": "application/json"
        }
      }); 
      const data = await response.json();
      // console.log(data);
      return data;
    }

    const requestTopRated = async () => {
      const response = await fetch(`${BASE_URL}/books/lists/curated-ratings`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const dataTopRated = await response.json();
      console.log(dataTopRated);
      return dataTopRated;
    }

    const requestFeatured = async () => {
      const response = await fetch(`${BASE_URL}/books/lists/featured`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const dataFeatured = await response.json();
      console.log(dataFeatured);
      return dataFeatured;
    }

    useEffect(() => {
        const fetchCuratedRanking = async () => {
            const data = await requestCuratedRanking();
            setTopCuratedRanking(data);
        }
        fetchCuratedRanking();
        const fetchTopRated = async () => {
          const dataTopRated = await requestTopRated();
          setTopRated(dataTopRated);
        }
        fetchTopRated();
      
          const fetchFeatured = async () => {
            const resultFeatured = await requestFeatured();
            console.log(resultFeatured);
            setFeatured(resultFeatured);
          }
          fetchFeatured();
    },[])

 
    return (
      <main>
        <h1>Home</h1>
        <DisplayCuratedRanking topCuratedRanking={topCuratedRanking}/>
        <DisplayHighestRanking topRated={topRated}/>
        <DisplayFeatured featured={featured}/>
      </main>
    );
  }

export default Home;
