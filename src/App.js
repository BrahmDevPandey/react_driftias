import Img2Pdf from "./components/img2pdf/Img2Pdf";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/img2pdf" element={<Img2Pdf />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
