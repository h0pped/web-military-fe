import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import Browse from "./pages/Browse/Browse";
import SignIn from "./pages/SignIn/SignIn";
import Footer from "./components/Footer/Footer";
import Cart from "./pages/Cart/Cart";
import Logout from "./pages/Logout/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import FormOrder from "./pages/FormOrder/FormOrder";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("email");
    setIsLoggedIn(false);
  };
  const handleLogIn = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:itemId" element={<ItemDetails />} />
          <Route
            path="/signin"
            element={<SignIn handleLogIn={handleLogIn} />}
          />
          <Route path="/browse" element={<Browse />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/form" element={<FormOrder />} />
          <Route
            path="/logout"
            element={<Logout handleLogout={handleLogout} />}
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
