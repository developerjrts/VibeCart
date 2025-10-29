import Button from "@/Components/Button";
import TextField from "@/Components/TextField";
import { local_url } from "@/constant/constant";
import axios, { isAxiosError } from "axios";
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [category, setCategory] = useState<string>();
  const [stock, setStock] = useState<number>();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState<Boolean>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name || "");
      formData.append("description", description || "");
      formData.append("price", String(price || 0));
      formData.append("category", category || "");
      formData.append("stock", String(stock || 0));
      if (image) formData.append("image", image);

      const token = localStorage.getItem("session_code");
      setLoading(true);
      const response = await axios.post(`${local_url}/product`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setName("");
      setDescription("");
      setCategory("");
      setPrice(undefined);
      setPreview("");
      setImage(null);
      setStock(undefined);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
      if (isAxiosError(error)) {
        const errMessage = error.response?.data.message;
        alert(errMessage);
      }
    }
  };

  return (
    <div className="flex py-10 items-center justify-center text-gray-800 p-8 flex-col gap-2 w-screen">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <div className="w-[40%] flex flex-col gap-4">
        <TextField
          label="Product Name"
          value={name}
          setValue={setName}
          placeholder="Enter product name"
        />
        <TextField
          label="Product Description"
          value={description}
          setValue={setDescription}
          placeholder="Enter product description"
        />
        <TextField
          label="Price"
          value={price}
          setValue={setPrice}
          placeholder="Enter product price"
          type="number"
        />
        <TextField
          label="Category"
          value={category}
          setValue={setCategory}
          placeholder="Enter product category"
        />
        <TextField
          label="Stock"
          value={stock}
          setValue={setStock}
          placeholder="Enter stock quantity"
          type="number"
        />

        <div>
          <p className="font-medium mb-1">Product poster</p>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        {loading ? (
          <p>Adding</p>
        ) : (
          <Button onClick={handleAddProduct} label="Add Product" />
        )}
      </div>
    </div>
  );
};

export default AddProduct;
