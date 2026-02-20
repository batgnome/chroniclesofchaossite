import { useParams } from "react-router-dom";
import comics from "../data/comicsData";

function ComicPage() {
  const { id } = useParams(); // Get the comic ID from the URL
  const comic = comics.find((c) => c.id === id); // Find the matching comic
  console.log(id)
  if (!comic) {
    return <h2>Comic Not Found</h2>;
  }

  return (
    <div className="comic-page">

      <h1>{comic.title}</h1>
      {/* <img src={comic.image} alt={comic.title} /> */}
      <img src={"https://assets.chronofchaos.com/page0001.png"} alt={comic.title} />
      <p>{comic.description}</p>
      <p>More content about {comic.title} coming soon...</p>
    </div>
  );
}

export default ComicPage;
