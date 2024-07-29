import React, { useState } from "react";

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);

  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  const handleQuantityChange = (product, quantity) => {
    const newQuantity = Math.max(1, quantity); // Ensure quantity is at least 1
    const newProducts = allProducts.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    const newTotal = newProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newCount = newProducts.reduce((acc, item) => acc + item.quantity, 0);
    setTotal(newTotal);
    setCountProducts(newCount);
    setAllProducts(newProducts);
  };

  return (
    <header>
      <h1 className="header-title">Jaguar Sport</h1>
      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <img
            src="https://res.cloudinary.com/djolwqp8g/image/upload/v1722214151/mis%20img/desafio/h0e8rahbtojuvbfgp9zb.png"
            alt="carrito"
            className="icon-cart"
          />
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>
      </div>
      <div className={`container-cart-products ${active ? 'active' : ''}`}>
      <img
                      src="https://res.cloudinary.com/djolwqp8g/image/upload/v1722213301/mis%20img/desafio/hc37eydrkcjpni6ssdzx.png"
                      alt="Cerrar Sidebar"
                      className="icon-closeSidebar"
                      onClick={() => setActive(false)} />
     
        {allProducts.length ? (
          <>
            <div className="row-product">
              {allProducts.map((product) => (
                <div className="cart-product" key={product.id}>
                  <div className="info-cart-product">
                    <img src={product.urlImage} alt={product.title} className="cart-product-image" />
                    <p className="titulo-producto-carrito">{product.title}</p>
                    <span className="precio-producto-carrito">${product.price}</span>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product, parseInt(e.target.value))}
                      min="1"
                      className="cantidad-producto-carrito"
                    />
                    <img
                      src="https://res.cloudinary.com/djolwqp8g/image/upload/v1722186923/mis%20img/desafio/z71vhihe3qntcl28pzzt.png"
                      alt="cerrar"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)} />
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>
              <button className="btn-clear-all" onClick={onCleanCart}>
                Vaciar Carrito
              </button>
          </>

        ) : (
          <p>No hay productos en el carrito</p>
        )}
      </div>
    </header>
  );
};