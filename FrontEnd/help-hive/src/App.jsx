import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About_US from "./pages/About-Us";
import Home from "./pages/Home";
import Explore from "./pages/Explore.jsx";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ProfilePage from "./pages/profile_page.jsx";  
// import Signup from "./pages/Signup";

function App() {
  const [user, setUser] = useState(null); // Track the user state (null means not logged in)

  const handleLoginSuccess = (userData) => {
    setUser(userData); 
  };

  const handleLogout = () => {
    setUser(null); 
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About_US />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} /> */}
          
        
          <Route 
            path="/login" 
            element={user ? <ProfilePage user={user} onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />

          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
