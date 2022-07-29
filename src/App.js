import { Link, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import { useState } from "react";
import { MyAccount, Login, Register, GuestCart, UserCart } from "./routes";
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
import Author from "./routes/components/SingleAuthor";


function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [username, setUsername] = useState(
    window.localStorage.getItem("username")
  );
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  return (
    <div className="App">
      <h1>Book Store</h1>

      <>
        <nav
          className="nav-bar"
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/Genre">Genre</Link>
          {token ? null : <Link to="/Login">Login</Link>}
          {token ? null : <Link to="/Register">Register</Link>}
          {token ? <Link to="/MyAccount">My Account</Link> : null}
          {token ? (
            <Link to={`/${userId}/cart`}>Cart</Link>
          ) : (
            <Link to="/GuestCart">Cart</Link>
          )}
          <SearchBar setSearchResult={setSearchResult}/>

        </nav>
      </>

      <>
      
        <Routes>
          <Route path="/" element={<Home userId={userId} token={token} />} />
          <Route
            path="Login"
            element={
              <Login
                setToken={setToken}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                setUserId={setUserId}
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
                setUserId={setUserId}
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
                setUserId={setUserId}
              />
            } />
          <Route path="/Genre" element={<Genre />} />
          <Route path="GuestCart" element={<GuestCart />} />
          <Route
            path={`/${userId}/cart`}
            element={<UserCart username={username} token={token}/>}
          />
          {/* <Route path={`/${book.id}`} /> */}
          <Route path="/Horror" element={<Horror />} />
          <Route path="/ScienceFiction" element={<ScienceFiction />} />
          <Route path="/GeneralFiction" element={<GeneralFiction />} />
          <Route path="/Mystery" element={<Mystery />} />
          <Route path="/Thriller" element={<Thriller />} />
          <Route path="/Comedy" element={<Comedy />} />
          <Route path="/Romance" element={<Romance />} />
          <Route path="/SearchResult" element={<SearchResult searchResult={searchResult}/>} />
          <Route path="/authors/:authorName" element={<Author  /> } />
        </Routes>
        
      </>
    </div>
  );
}

export default App;
