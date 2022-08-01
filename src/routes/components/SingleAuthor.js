import { useEffect, useState } from "react";
import { requestAuthor } from "../../api";
import { useParams } from "react-router-dom";
import { faker } from '@faker-js/faker';
import CartForm from "./CartForm";
import { Link } from "react-router-dom";



function Author(){
    const [author, setAuthor] = useState([]);
    const { authorName } = useParams()
    const fakeBio = faker.lorem.paragraph(6);
    const fakePic = faker.image.people( 600, 400, true ); 
    

    useEffect(()=> {
        const fetchAuthorData = async () => {
            const authorData = await requestAuthor(authorName);
            setAuthor(authorData);
        }
        fetchAuthorData();
    },[authorName])
    return(
        <section>
        <header>
        <h3>{ authorName } </h3>
        <img className="authorPic"
        style={{width:400, height:400}}
        src={fakePic} alt="awful"></img>
        <p>
          <strong> About author:</strong> {fakeBio}
        </p>
        </header>
        <div className="authorPage">
        {author.map(book =>{
        return(
            <>
            <div key={book.id}>
              <Link to={`/${book.id}`}>
                <img src={book.imageLinkM} alt={book.title} />
              </Link>
              <Link to={`/authors/${book.author}`}>
              <p> By {book.author}</p>
              </Link>
              <CartForm  />
            </div>
          </>
        );
      })}
    </div>
  </section>
);
};

export default Author;
