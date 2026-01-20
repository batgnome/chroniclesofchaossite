import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/Animations">Animations</Link>
      <Link to="/Portfolio">Portfolio</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/comics">Comics</Link>
      <Link to="/stories">Short Stories</Link>
      <Link to="/essays">Essays</Link>
      <Link to="/games">Games</Link>
      <Link to="/about">About</Link>
      <Link to="/admin">Admin</Link>
      {/* <Link to="/contact">Contact</Link> */}
    </nav>
  );
}

export default Navbar;
