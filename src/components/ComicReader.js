// import { useParams, useSearchParams } from "react-router-dom";
import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import comics from "../data/comicsData";

function ComicReader() {
  const totalPages = 61; // Adjust based on your episodes
  // const { id } = useParams();
  const comic = comics.find((c) => c.id === id); // 👈 look up the comic by ID
  const bookRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [gotoInput, setGotoInput] = useState("");

const pages = Array.from({ length: totalPages }, (_, i) => {
  const pageNumber = String(i + 1).padStart(4, "0");
  return `${process.env.PUBLIC_URL}${comic.imageSource}/page${pageNumber}.png`;
});

  const goToPage = (pageNum) => {
    if (bookRef.current) {
      bookRef.current.pageFlip().turnToPage(pageNum);
    }
  };

  const onFlip = (e) => {
    setCurrentPage(e.data);
  };

  const handleGoToSubmit = () => {
    const page = parseInt(gotoInput, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      goToPage(page - 1);
      setGotoInput("");
    }
  };

  return (
    <div className="comic-reader">
      
      <h1>{comic.title}</h1>

      {/* 📘 Navigation Controls */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => goToPage(0)} disabled={currentPage === 0}>
          First
        </button>
        <button onClick={() => goToPage(currentPage === 1? currentPage-1:currentPage - 2)} disabled={currentPage === 0}>
          Prev
        </button>
        <button onClick={() => goToPage(currentPage + 2)} disabled={currentPage === totalPages - 1}>
          Next
        </button>
        <button onClick={() => goToPage(totalPages - 1)} disabled={currentPage === totalPages - 1}>
          Last
        </button>
      </div>

      {/* 🔎 Go To Page */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Go to page..."
          value={gotoInput}
          onChange={(e) => setGotoInput(e.target.value)}
          min={1}
          max={totalPages}
        />
        <button onClick={handleGoToSubmit}>Go</button>
      </div>

      {/* 📖 Flipbook */}
      <HTMLFlipBook
        width={400}
        height={640}
        size="stretch"
        minWidth={400}
        minHeight={400}
        maxWidth={400}
        maxHeight={640}
        showCover={true}
        className="flipbook"
        ref={bookRef}
        onFlip={onFlip}
      >
        {pages.map((page, index) => (
          <div key={index} className="page">
            <img
              src={page}
              alt={`Page ${index + 1}`}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {index+1}
          </div>
        ))}
      </HTMLFlipBook>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => goToPage(0)} disabled={currentPage === 0}>
          First
        </button>
        <button onClick={() => goToPage(currentPage === 1? currentPage-1:currentPage - 2)} disabled={currentPage === 0}>
          Prev
        </button>
        <button onClick={() => goToPage(currentPage + 2)} disabled={currentPage === totalPages - 1}>
          Next
        </button>
        <button onClick={() => goToPage(totalPages - 1)} disabled={currentPage === totalPages - 1}>
          Last
        </button>
      </div>

      {/* 🔎 Go To Page */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Go to page..."
          value={gotoInput}
          onChange={(e) => setGotoInput(e.target.value)}
          min={1}
          max={totalPages}
        />
        <button onClick={handleGoToSubmit}>Go</button>
      </div>
    </div>
    
  );
}

export default ComicReader;
