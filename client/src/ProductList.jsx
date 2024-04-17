import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.headers.common["Authorization"] = "Bearer token";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("/products");
    console.log(res.data);
    setProducts(res.data);
    // setTotal(res.data.length)
  };
  const handleClick = (id) => {
    fetch(`/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        setProducts(products.filter((pro) => pro._id !== id));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, [setProducts]);

  return (
    <>
      {products ? (
        products.map((product, index) => (
          <Product {...product} key={index} handleClick={handleClick}></Product>
        ))
      ) : (
        <h1>hello</h1>
      )}
    </>
  );
};

export default ProductList;
