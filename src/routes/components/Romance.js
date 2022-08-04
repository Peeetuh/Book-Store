// import { useEffect, useState } from "react";
// import { requestRomance } from "../../api";

// function Romance(){
//     const [romanceGenre, setRomanceGenre] = useState([]);

//     useEffect(() => {
//         const fetchRomance = async () => {
//             const data = await requestRomance();
//             setRomanceGenre(data);
//         }
//         fetchRomance();
//     },[])

//     return(
//         <section>
//             <header>
//             <h3>Romance</h3>
//             </header>
//             <div className="curated-container">
//             {romanceGenre.map(book =>{
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

// export default Romance;