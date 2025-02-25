import { Link } from "react-router-dom";

const episodes = Array.from({ length: 5 }, (_, i) => i + 1); // Adjust based on the number of episodes

function ComicEpisodes() {
  return (
    <div className="comic-episodes">
      <h1>Chronicles of Chaos Episodes</h1>
      <div className="episode-list">
        {episodes.map((ep) => (
          <div key={ep} className="episode-card">
            <h2>Episode {ep}</h2>
            <Link to={`/comics/chronicles-of-chaos/episode/${ep}`} className="read-button">Read Episode {ep}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComicEpisodes;
