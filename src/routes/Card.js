import "./Card.css";
 
 function Card({Link, img}) {
    return (     
        <div className="card-container">
          <div className="image-container">
            <img src={img} alt="" />
          </div>
          <div className="card-title">
            <h3>{Link}</h3>
            </div> 
         </div>      
         

    );
  }

  export default Card;