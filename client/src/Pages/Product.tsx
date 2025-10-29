import Button from "@/Components/Button";
import { local_url } from "@/constant/constant";
import type { product } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const [product, setProduct] = useState<product>();
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(0);

  const getProduct = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("session_code");
      const response = await axios.get(`${local_url}/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);

      setProduct(response.data.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        Loading...
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("session_code");
      const response = await axios.post(
        `${local_url}/cart`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Item added to cart");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen text-gray-800 h-screen gap-4 p-4">
      <h1 className="text-3xl font-medium ">{product?.name}</h1>
      <img
        src={product?.poster}
        alt="poster"
        className="w-[400px] rounded-md h-[250px]"
      />
      <p>{product?.description}</p>
      <div className="flex cursor-pointer items-center  text-2xl gap-4">
        <p
          onClick={() => {
            if (quantity < 1) {
              return;
            } else {
              setQuantity(quantity - 1);
            }
          }}
        >
          -
        </p>
        <p className="border border-gray-800 w-10 h-10 items-center justify-center flex rounded-full p-2">
          {quantity}
        </p>
        <p
          onClick={() => {
            setQuantity(quantity + 1);
          }}
        >
          +
        </p>
        <Button onClick={handleAddToCart} label="Add to cart" />
      </div>
    </div>
  );
};

export default Product;
