// import { useEffect, useState } from "react";
// import { requestThriller } from "../../api";

// function Thriller(){
//     const [thrillerGenre, setThrillerGenre] = useState([]);

//     useEffect(() => {
//         const fetchThriller = async () => {
//             const data = await requestThriller();
//             setThrillerGenre(data);
//         }
//         fetchThriller();
//     },[])

//     return(
//         <section>
//             <header>
//             <h3>Thriller</h3>
//             </header>
//             <div className="curated-container">
//             {thrillerGenre.map(book =>{
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

// export default Thriller;