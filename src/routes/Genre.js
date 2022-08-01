import { Link } from 'react-router-dom';    

 function Genre() {
    return (
      <div>
        <h1>Genre</h1>
                <div className="genre-card">
                <div className="image-container">
                <Link to='/Horror'> Horror </Link>
                </div>
                </div>
            
                <Link to='/Romance'> Romance </Link>
            
            
                <Link to='/Thriller'> Thriller </Link>
        
                <Link to='/Comedy'> Comedy </Link>
           
                <Link to='/ScienceFiction'> Science-Fiction </Link>
           
                <Link to='/GeneralFiction'> General Fiction </Link>
           
                <Link to='/Mystery'> Mystery </Link>


      </div>

    );
  }

  export default Genre;