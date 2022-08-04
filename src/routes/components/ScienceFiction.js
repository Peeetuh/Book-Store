// import { useEffect, useState } from "react";
// import { requestScienceFiction } from "../../api";

// function Horror(){
//     const [scienceFictionGenre, setScienceFictionGenre] = useState([]);

//     useEffect(() => {
//         const fetchScienceFiction = async () => {
//             const data = await requestScienceFiction();
//             setScienceFictionGenre(data);
//         }
//         fetchScienceFiction();
//     },[])

//     return(
//         <section>
//             <header>
//             <h3>Science-Fiction</h3>
//             </header>
//             <div className="curated-container">
//             {scienceFictionGenre.map(book =>{
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

// export default Horror;