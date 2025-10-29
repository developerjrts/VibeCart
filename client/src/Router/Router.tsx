import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/Pages/Home";
import SignIn from "@/Pages/SignIn";
import SignUp from "@/Pages/SignUp";
import AddProduct from "@/Pages/AddProduct";
import Product from "@/Pages/Product";
import Cart from "@/Pages/Cart";
import Checkout from "@/Pages/Checkout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" Component={SignIn} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/" Component={Home} />
        <Route path="/cart" Component={Cart} />
        <Route path="/cart/checkout" Component={Checkout} />
        <Route path="/product/:productId" Component={Product} />
        <Route path="/add" Component={AddProduct} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
