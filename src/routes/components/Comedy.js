// import { useEffect, useState } from "react";
// import { requestComedy } from "../../api";

// function Comedy(){
//     const [comedyGenre, setComedyGenre] = useState([]);

//     useEffect(() => {
//         const fetchComedy = async () => {
//             const data = await requestComedy();
//             setComedyGenre(data);
//         }
//         fetchComedy();
//     },[])

//     return(
//         <section>
//             <header>
//             <h3>Comedy</h3>
//             </header>
//             <div className="curated-container">
//             {comedyGenre.map(book =>{
//             return(
//                 <div key={book.id}>
//                     <img src={book.imageLinkS} alt={book.title}/>
//                 </div>
//             )
//             })}
//                 </div>
//         </section>
//     )
// };

// export default Comedy;