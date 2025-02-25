import { useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";

function ComicReader() {
  const { episode } = useParams();
  const totalPages = 54; // Change based on your episodes

  // Generate image URLs dynamically
  const pages = Array.from({ length: totalPages }, (_, i) => 
    `${process.env.PUBLIC_URL}/ChroniclesOfChaos/episode${episode}page(${i + 1}).png`
  );

  return (
    <div className="comic-reader">
      <h1>Chronicles of Chaos - Episode {episode}</h1>

      <HTMLFlipBook 
        width={400} 
        height={640} 
        size="stretch" 
        minWidth={400} 
        minHeight={400}
        maxWidth={400} 
        maxHeight={400}
        showCover={true} 
        className="flipbook"
      >
        {pages.map((page, index) => (
          <div key={index} className="page">
            <img src={page} alt={`Page ${index + 1}`} />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}

export default ComicReader;
