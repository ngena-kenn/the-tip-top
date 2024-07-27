import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/acceuil";
import "./App.css";
import "./scss/acceuil.scss"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
      </Routes>
    </>
  )
}


export default App;
