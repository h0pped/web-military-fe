import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import Browse from "./pages/Browse/Browse";
import SignIn from "./pages/SignIn/SignIn";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:itemId" element={<ItemDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
