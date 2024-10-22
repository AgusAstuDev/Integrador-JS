// LOCALE STORAGE

export const getProductLocalStorage = () => {
  const products = JSON.parse(localStorage.getItem("products"));
  if (products) {
    return products;
  } else {
    return [];
  }
};

export const setInLocalStorage = (productIn) => {
  let productsInLocal = getProductLocalStorage();

  const verifyExistIndex = productsInLocal.findIndex(
    (productsLocal) => productsLocal.id === productIn.id
  );

  if (verifyExistIndex !== -1) {
    productsInLocal[verifyExistIndex] = productIn;
  } else {
    productsInLocal.push(productIn);
  }
  localStorage.setItem("products", JSON.stringify(productsInLocal));
};
