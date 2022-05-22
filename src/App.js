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
import OrderStatus from "./pages/OrderStatus/OrderStatus";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import SignUp from "./pages/SignUp/SignUp";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };
  const handleLogIn = () => {
    setIsLoggedIn(true);
    const role = localStorage.getItem("role");
    if (role === "a") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (email) {
      setIsLoggedIn(true);
      if (role === "a") {
        setIsAdmin(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:itemId" element={<ItemDetails />} />
          <Route
            path="/signin"
            element={<SignIn handleLogIn={handleLogIn} />}
          />
          <Route
            path="/signup"
            element={<SignUp handleLogIn={handleLogIn} />}
          />
          <Route path="/browse" element={<Browse />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/form" element={<FormOrder />} />
          <Route path="/status" element={<OrderStatus />} />
          <Route path="/admin" element={<AdminPanel />} />
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
