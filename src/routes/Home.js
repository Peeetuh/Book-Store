import { useEffect, useState } from "react";
import DisplayCuratedRanking from "./components/DisplayCuratedRanking";
import DisplayHighestRanking from "./components/DisplayHighestRanking";
import DisplayFeatured from "./components/DisplayFeatured";
import { requestCuratedRanking, requestTopRated, requestFeatured } from "../api";

function Home() {
  const [topCuratedRanking, setTopCuratedRanking] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [featured, setFeatured] = useState([]);


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
            setFeatured(resultFeatured[0]);
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
