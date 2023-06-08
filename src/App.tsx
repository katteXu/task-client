import Home from "./pages/home";
import Product from "./pages/product";
import About from "./pages/about";
import Error from "./pages/error";
import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="">
      <header>
        <h3>Hello World</h3>
      </header>
      <nav>
        <NavLink to="/">首页</NavLink>
        <NavLink to="product">产品</NavLink>
        <NavLink to="about">关于</NavLink>
        {/* <NavLink to="aaa">404</NavLink> */}
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
