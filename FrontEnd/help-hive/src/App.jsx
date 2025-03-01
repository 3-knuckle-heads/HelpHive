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
import Signup from "./pages/Signup.jsx";
import MyEvents from "./pages/MyEvents";
import Certificate from "./components/Certificate.jsx";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (!user && localStorage.getItem("token")) {
    setUser({
      token: localStorage.getItem("token"),
    });
  }

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
          <Route path="/myevents" element={<MyEvents />} />
          <Route path="/certificate" element={<Certificate />} />
  

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
            path="/signup"
            element={
              user ? (
                <ProfilePage user={user} onLogout={handleLogout} />
              ) : (
                <Signup onLoginSuccess={handleLoginSuccess} />
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
