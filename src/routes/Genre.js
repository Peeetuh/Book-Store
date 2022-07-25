import { Link } from 'react-router-dom';    

 function Genre() {
    return (
      <div>
        <h1>Genre</h1>

        <ul>
            <li>
                <Link to='/Horror'> Horror </Link>
            </li>
            <li>
                <Link to='/Romance'> Romance </Link>
            </li>
            <li>
                <Link to='/Thriller'> Thriller </Link>
            </li>
            <li>
                <Link to='/Comedy'> Comedy </Link>
            </li>
            <li>
                <Link to='/ScienceFiction'> Science-Fiction </Link>
            </li>
            <li>
                <Link to='/GeneralFiction'> General Fiction </Link>
            </li>
            <li>
                <Link to='/Mystery'> Mystery </Link>
            </li>
        </ul>

      </div>

    );
  }

  export default Genre;