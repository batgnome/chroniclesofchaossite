import { useState } from "react";
import "./Animations.css";

const animationFiles = [
  "Skate",
  "ArcherJohnAndTheGiant",
  "wildChild",
];

function Animations() {
  const [currentAnimation, setCurrentAnimation] = useState(animationFiles[0]);

  return (
    <div className="animations-page">
      <div className="main-player">
        <img
          src={`${process.env.PUBLIC_URL}/Animations/${currentAnimation}.gif`}
          alt={currentAnimation}
          className="main-video"
        />
      </div>

      <div className="side-scroll-bar">
        {animationFiles.map((file, index) => (
          <div
            key={index}
            className="video-thumbnail"
            onClick={() => setCurrentAnimation(file)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/Animations/${file}.png`}
              alt={file}
            />
            <p>{file.replace(".gif", "")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Animations;
