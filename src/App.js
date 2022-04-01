import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Photos from "./Pages/Photos/Photos";
import Tourism from "./Pages/Tourism/Tourism";
import Reservation from "./Pages/Reservation/Reservation";
import Contact from "./Pages/Contact/Contact";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={`${process.env.PUBLIC_URL}/photos`}
          element={
            <>
              <Navbar />
              <Photos />
            </>
          }
        />
        <Route
          path={`${process.env.PUBLIC_URL}/tourisme`}
          element={
            <>
              <Navbar />
              <Tourism />
            </>
          }
        />
        <Route
          path={`${process.env.PUBLIC_URL}/reservation`}
          element={
            <>
              <Navbar />
              <Reservation />
            </>
          }
        />
        <Route
          path={`${process.env.PUBLIC_URL}/contact`}
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
