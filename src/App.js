import logo from "./logo.svg";
import "./App.css";
import "./Component/css/style.css"

import Sidebar from "./Component/Sidebar";
import Home from "./Component/Home";
import Header from "./Component/Header";

function App() {
  return (
    <>
     <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="container">
          <Home />
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
