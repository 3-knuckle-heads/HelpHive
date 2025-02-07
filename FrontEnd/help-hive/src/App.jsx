import { useState } from "react";
import Navbar from "./components/Navbar";
import search_bar from "./components/search_bar.jsx";
import Button from "./components/Button.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About_US from "./pages/About-Us";
import Home from "./pages/Home";
import Explore from "./pages/Explore.jsx";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About_US />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
