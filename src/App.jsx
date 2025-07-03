import { Routes, Route } from "react-router-dom";
import Home from "./Components/Pages/Home/Home.jsx";
import Service from "./Components/Pages/Services/Service.jsx";
import About from "./Components/Pages/AboutUs/About.jsx";
import Nav from "./Components/Nav/Nav.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Contact from "./Components/Pages/Contact/Contact.jsx";
import Terms from "./Components/Pages/Terms/Terms.jsx";
import Privacy from "./Components/Pages/Privacy/Privacy.jsx";

import "./App.css";
import TopBtn from "./Components/BackToTopBtn/Top.jsx";
import ThankYou from "./Components/ThankYouPage/ThankYou.jsx";

function App() {
  return (
    <div className="App" style={{ flex: 1 }}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <Footer />
      <TopBtn />
    </div>
  );
}

export default App;
