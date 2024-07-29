import React, { useState } from "react";
import { data } from "../data";
import Modal from "./modal";

export const ProductList = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const onAddProduct = product => {
    if (allProducts.find(item => item.id === product.id)) {
      const products = allProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }
    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };

  return (
    <div className='container-items'>
      {data.map(product => (
        <div className='item' key={product.id}>
          <figure>
            <img
              src={product.urlImage}
              alt={product.title}
              onClick={() => handleImageClick(product)}
            />
          </figure>
          <div className='info-product'>
            <h2>{product.title}</h2>
            <p className='price'>${product.price}</p>
            <button onClick={() => onAddProduct(product)}>
              Añadir al carrito
            </button>
          </div>
        </div>
      ))}
      {selectedBook && (
        <Modal show={showModal} onClose={closeModal} book={selectedBook} />
      )}
    </div>
  );
};
