import { useState } from "react";
import "./Portfolio.css";

const totalImages = 82;
const totalVideos = 5;

const imageFiles = Array.from({ length: totalImages }, (_, i) => `art (${i + 1}).png`);
const videoFiles = Array.from({ length: totalVideos }, (_, i) => `vid (${i + 1}).mp4`);

const portfolioFiles = [...imageFiles, ...videoFiles];

function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(null);

  const openMedia = (index) => setActiveIndex(index);
  const closeMedia = () => setActiveIndex(null);

  const nextMedia = () =>
    setActiveIndex((prev) => (prev + 1) % portfolioFiles.length);

  const prevMedia = () =>
    setActiveIndex((prev) =>
      prev === 0 ? portfolioFiles.length - 1 : prev - 1
    );

  const activeMedia =
    activeIndex !== null ? portfolioFiles[activeIndex] : null;

  const isVideo = (file) => file.startsWith("vid");

  return (
    <div className="portfolio-page">
      <h1>Portfolio</h1>

      <div className="portfolio-grid">
        {portfolioFiles.map((file, index) => {
          const filePath = `${process.env.PUBLIC_URL}/portfolio/${file}`;
          return (
            <div
              key={index}
              className="portfolio-item"
              onClick={() => openMedia(index)}
            >
              {isVideo(file) ? (
                <video muted>
                  <source src={filePath} type="video/mp4" />
                </video>
              ) : (
                <img src={filePath} alt={file} />
              )}
              <p>{file.replace(/\.\w+/, "")}</p>
            </div>
          );
        })}
      </div>

      {activeMedia && (
        <div className="overlay">
          <button className="close-btn" onClick={closeMedia}>×</button>
          <button className="nav-btn left" onClick={prevMedia}>❮</button>
          <button className="nav-btn right" onClick={nextMedia}>❯</button>

          {isVideo(activeMedia) ? (
            <video controls autoPlay>
              <source
                src={`${process.env.PUBLIC_URL}/Portfolio/${activeMedia}`}
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/Portfolio/${activeMedia}`}
              alt="Expanded"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Portfolio;
