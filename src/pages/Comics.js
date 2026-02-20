import { Link } from "react-router-dom";
import comics from "../data/comicsData";
import "./Comics.css";
function Comics() {
  return (
    <div className="comics-page">
      <h1>Comics</h1>
      <div className="comic-list">
        {comics.map((comic) => (
          <div key={comic.id} className="comic-card">
            <img src={comic.image} alt={comic.title} />
            <h2>{comic.title}</h2>
            <p>{comic.description}</p>
            <Link to={`/comics/${comic.id}`} className="comic-link">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comics;
