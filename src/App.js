import { Link, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./routes/Home";
import { useState } from "react";
import { MyAccount, Login, Register } from "./routes";
import "./App.css";
import SearchBar from './routes/components/SearchBar';
import Genre from "./routes/Genre";
import Horror from "./routes/components/Horror";
import ScienceFiction from "./routes/components/ScienceFiction";
import GeneralFiction from "./routes/components/GeneralFiction";
import Mystery from "./routes/components/Mystery";
import Comedy from "./routes/components/Comedy";
import Romance from "./routes/components/Romance";
import Thriller from "./routes/components/Thriller";
import SearchResult from "./routes/components/SearchResult";
import img1 from "./routes/components/Images/logo.png"




function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [username, setUsername] = useState(
    window.localStorage.getItem("username")
  );
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  return (
    <div className="App">
      {/* <h1>Book Store</h1> */}

      <>
        <nav className="nav-bar">
        <img src={img1} alt="logo" className="logo"/>
          <Link className="links" to="/">Home</Link>
          <Link className="links" to="/Genre">Genre</Link>
          {token ? null : <Link className="links" to="/Login">Login</Link>}
          {token ? null : <Link className="links" to="/Register">Register</Link>}
          {token ? <Link className="links" to="/MyAccount">My Account</Link> : null}
        </nav>
        <nav className="nav-bar-search">
        <SearchBar setSearchResult={setSearchResult}/>
        </nav>
      </>

      <>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Genre" element={<Genre />} />
          <Route
            path="Login"
            element={
              <Login
                setToken={setToken}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="Register"
            element={
              <Register
                setToken={setToken}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="MyAccount"
            element={
              <MyAccount
                token={token}
                setToken={setToken}
                setUsername={setUsername}
                username={username}
              />
            }
          />
          <Route path="/Horror" element={<Horror />} />
          <Route path="/ScienceFiction" element={<ScienceFiction />} />
          <Route path="/GeneralFiction" element={<GeneralFiction />} />
          <Route path="/Mystery" element={<Mystery />} />
          <Route path="/Thriller" element={<Thriller />} />
          <Route path="/Comedy" element={<Comedy />} />
          <Route path="/Romance" element={<Romance />} />
          <Route path="/SearchResult" element={<SearchResult searchResult={searchResult}/>} />
        </Routes>
        
      </>
    </div>
  );
}

export default App;
