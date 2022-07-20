import { Link, Route, Routes } from "react-router-dom";
import JSONDATA from './booksData.json';
import Home from "./routes/Home";
import Login from "./routes/Login";
import MyAccount from "./routes/MyAccount";
import Register from "./routes/Register";
// import SearchBar from "./routes/components/SearchBar";
// import axios from 'axios';
import './App.css';
import SearchBar from "./routes/components/SearchBar";



function App() {
  return (
    <div className="App">
      <h1>Book Store</h1>

      <>
      <nav className="nav">

        <Link to="/Home">Home</Link> |
        <Link to="/Login">Login</Link> |
        <Link to="/Register">Register</Link> |
        <Link to="/MyAccount">My Account</Link> |
        <SearchBar />

      </nav>
      </>

      <>
      <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="MyAccount" element={<MyAccount />} />
      </Routes>
      </>

    </div>
  )
}

export default App;
