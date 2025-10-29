import Nav from "@/Components/Nav";
import ProductCard from "@/Components/ProductCard";
import { local_url } from "@/constant/constant";
import type { product } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState<product[]>([]);

  const getProducts = async () => {
    try {
      const token = localStorage.getItem("session_code");
      const response = await axios.get(`${local_url}/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Nav />
      <div className="grid grid-cols-6 gap-4 px-10 py-10">
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
