import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About_US from "./pages/About-Us";
import Home from "./pages/Home";
import Explore from "./pages/Explore.jsx";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage.jsx";
import AddEventPage from "./pages/AddEventPage.jsx";
import Faq from "./pages/Faq.jsx";
import EventDesc from "./pages/EventDesc.jsx";

function App() {
  const [user, setUser] = useState(null); 

  
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };


  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route index element={<Home user={user} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About_US />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/eventcreate" element={<AddEventPage />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/eventview/:id" element={<EventDesc />} />
          
          {/* Login/Signup and Profile */}
          <Route
            path="/login"
            element={
              user ? (
                <ProfilePage user={user} onLogout={handleLogout} />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfilePage user={user} onLogout={handleLogout} />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
