import Card from "./Card";

function Section() {
  return (
    <div className="section">
      <Card image="https://example.com/blog-thumbnail.jpg" title="Latest Blog Post" description="Dive into our newest adventures and insights." />
      <Card image="https://example.com/comic-thumbnail.jpg" title="Comics" description="Follow our illustrated tales from start to finish." />
      <Card image="https://example.com/game-thumbnail.jpg" title="Games & Devlog" description="Peek into the development of our latest creations." />
    </div>
  );
}

export default Section;
