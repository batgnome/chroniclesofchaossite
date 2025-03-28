import { Link } from "react-router-dom";
import comics from "../data/comicsData";

function Hero() {
  return (
    <div className="hero" style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem" }}>Explore the World Off the Rails</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", margin: "1rem auto" }}>
        Rediscover the joy of storytelling and creation in a place where time stands still. Comics,
        animations, tales of chaos and wonder — it all lives here.
      </p>

      {/* 🚀 Featured Comic */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Featured Comic:</h3>
        <Link to={`/comics/${comics[0].id}`} className="comics-page">
          <img
            src={comics[0].image}
            alt={comics[0].title}
            style={{ maxWidth: "300px", borderRadius: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
          />
          <p>{comics[0].title}</p>
        </Link>
      </div>

      {/* 🔗 Navigation */}
      <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
        <Link to="/comics" className="nav-button">View All Comics</Link>
        <Link to="/animations" className="nav-button">Watch Animations</Link>
        <Link to="/stories" className="nav-button">Read Stories</Link>
        <Link to="/about" className="nav-button">About Me</Link>
      </div>
    </div>
  );
}

export default Hero;
