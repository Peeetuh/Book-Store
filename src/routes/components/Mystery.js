import { useEffect, useState } from "react";
import { requestMystery } from "../../api";

function Mystery(){
    const [mysteryGenre, setMysteryGenre] = useState([]);

    useEffect(() => {
        const fetchMystery = async () => {
            const data = await requestMystery();
            setMysteryGenre(data);
        }
        fetchMystery();
    },[])

    return(
        <section>
            <header>
            <h3>Mystery</h3>
            </header>
            <div className="curated-container">
            {mysteryGenre.map(book =>{
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

export default Mystery;