import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Authorization"] = "Bearer token";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (id) => {
    console.log(typeof id);
    fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(products.filter((pro) => pro._id !== id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, [setProducts]);

  return (
    <>
      {products &&
        products.map((product, index) => (
          <Product {...product} key={index} handleClick={handleClick}></Product>
        ))}
    </>
  );
};

export default ProductList;
