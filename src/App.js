import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./Authentication";
import MyBookings from "./pages/MyBookings";
import MyServices from "./pages/MyServices";
import Services from "./pages/Services";
function App() {
  return (
    <>
      <BrowserRouter>
        <Authentication>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/mybookings" element={<MyBookings />}></Route>
            <Route path="/myservices" element={<MyServices />}></Route>
            <Route path="/services" element={<Services />}></Route>

          </Routes>
        </Authentication>
      </BrowserRouter>
    </>
  );
}

export default App;
