import type { product } from "@/types/types";
import { useNavigate } from "react-router-dom";

interface props {
  product: product;
}

const ProductCard = ({ product }: props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="p-2 rounded-md border cursor-pointer border-gray-400 shadow-lg"
    >
      <img src={product.poster} className="w-full h-36 rounded-md" />
      <h1 className="font-medium text-lg ">{product.name}</h1>
      <h1>${product.price}</h1>
    </div>
  );
};

export default ProductCard;
