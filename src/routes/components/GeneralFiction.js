import { useEffect, useState } from "react";
import { requestGeneralFiction } from "../../api";

function GeneralFiction(){
    const [generalFictionGenre, setGeneralFictionGenre] = useState([]);

    useEffect(() => {
        const fetchGeneralFiction = async () => {
            const data = await requestGeneralFiction();
            setGeneralFictionGenre(data);
        }
        fetchGeneralFiction();
    },[])

    return(
        <section>
            <header>
            <h3>General-Fiction</h3>
            </header>
            <div className="curated-container">
            {generalFictionGenre.map(book =>{
            return(
                <div key={book.id}>
                    <img src={book.imageLinkS} alt={book.title}/>
                </div>
            )
            })}
                </div>
        </section>
    )
};

export default GeneralFiction;