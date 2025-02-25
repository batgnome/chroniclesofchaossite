import { useParams } from "react-router-dom";

function ComicReader() {
  const { episode } = useParams(); // Get episode number from URL

  // Generate file names based on your format
  const totalPages = 10; // Change this based on the actual number of pages per episode
  const pages = Array.from({ length: totalPages }, (_, i) => 
    `${process.env.PUBLIC_URL}/ChroniclesOfChaos/episode${episode}page(${i + 1}).png`
  );

  return (
    <div className="comic-reader">
      <h1>Chronicles of Chaos - Episode {episode}</h1>
      {pages.map((page, index) => (
        <img key={index} src={page} alt={`Episode${episode}Page(${index + 1})`} className="comic-page" />
      ))}
    </div>
  );
}

export default ComicReader;
