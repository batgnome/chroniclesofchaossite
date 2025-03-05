import "./Animations.css";

function Animations() {
  return (
    <div className="animations-page">
      <div className="main-player">
        <img
          src={`${process.env.PUBLIC_URL}/animations/Skate.gif`}
          alt="Main Animation"
          className="main-video"
        />
      </div>

      <div className="side-scroll-bar">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="video-thumbnail">
            <img
              src={`${process.env.PUBLIC_URL}/animations/placeholder-thumbnail.png`}
              alt={`Placeholder ${index + 1}`}
            />
            <p>Animation {index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Animations;
