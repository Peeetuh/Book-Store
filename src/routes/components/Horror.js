// import { useEffect, useState } from "react";
// import { requestHorror } from "../../api";

// function Horror(){
//     const [horrorGenre, setHorrorGenre] = useState([]);

//     useEffect(() => {
//         const fetchHorror = async () => {
//             const data = await requestHorror();
//             setHorrorGenre(data);
//         }
//         fetchHorror();
//     },[])

//     return(
//         <section>
//             <header>
//             <h3>Horror</h3>
//             </header>
//             <div className="curated-container">
//             {horrorGenre.map(book =>{
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