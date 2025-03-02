// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import Comics from "./pages/Comics";
import ComicPage from "./pages/ComicPage";
import ComicEpisodes from "./pages/ComicEpisodes";
import ComicReader from "./components/ComicReader";
import Stories from "./pages/Stories";
import Essays from "./pages/Essays";
import Games from "./pages/Games";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./styles.css";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* <Route path="/blog" element={<Blog />} /> */}
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:id" element={<ComicPage />} />
        <Route path="/comics/chronicles-of-chaos" element={<ComicReader />} />
        <Route path="/comics/chronicles-of-chaos/episode/:episode" element={<ComicReader />} />
        {/* <Route path="/stories" element={<Stories />} /> */}
        {/* <Route path="/essays" element={<Essays />} /> */}
        {/* <Route path="/games" element={<Games />} /> */}
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
