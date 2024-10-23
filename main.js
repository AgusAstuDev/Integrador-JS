import {
  getProductLocalStorage,
  setInLocalStorage,
} from "./src/persistence/localStorage";
import { renderCategories } from "./src/services/categories";
import { renderListProducts, viewGetProducts } from "./src/views/store";
import "./style.css";

renderCategories();

// LOGICA DEL POPUP
const buttonAdd = document.getElementById("header_btn_add");

buttonAdd.addEventListener("click", () => {
  openModal();
});

const cancel_button = document.getElementById("popup_btn_close");

cancel_button.addEventListener("click", () => {
  closeModal();
});

export const openModal = () => {
  const modal = document.getElementById("modal_popup");
  modal.style.display = "flex";

  if (productoActivo) {
    const nombre = document.getElementById("nombre"),
      precio = document.getElementById("precio"),
      img = document.getElementById("img"),
      categoria = document.getElementById("categoria");
    nombre.value = productoActivo.nombre;
    precio.value = productoActivo.precio;
    img.value = productoActivo.img;
    categoria.value = productoActivo.categoria;

    deleteButton.style.display = "block";
  } else {
    deleteButton.style.display = "none";
  }
};

export const closeModal = () => {
  const modal = document.getElementById("modal_popup");
  modal.style.display = "none";
  resetModal();
  setProductoActivo(null);
};

const resetModal = () => {
  const nombre = document.getElementById("nombre"),
    precio = document.getElementById("precio"),
    img = document.getElementById("img"),
    categoria = document.getElementById("categoria");
  nombre.value = "";
  precio.value = 0;
  img.value = "";
  categoria.value = "Seleccione una categoria";
};

// LOGICA BOTONES POPUP

const acceptButton = document.getElementById("popup_btn_accept");
acceptButton.addEventListener("click", () => {
  handleSaveModifyProduct();
  const allProducts = getProductLocalStorage();
  renderListProducts(allProducts);
});

const handleSaveModifyProduct = () => {
  const nombre = document.getElementById("nombre").value,
    precio = document.getElementById("precio").value,
    img = document.getElementById("img").value,
    categoria = document.getElementById("categoria").value;

  let object = null;

  if (productoActivo) {
    object = {
      ...productoActivo,
      nombre,
      precio,
      img,
      categoria,
    };
  } else {
    object = {
      id: new Date().toISOString(),
      nombre,
      precio,
      img,
      categoria,
    };
  }
  setInLocalStorage(object);

  closeModal();
};

viewGetProducts();

export let categoriaActiva = null;

export const setCategoriaActiva = (categoriaIn) => {
  categoriaActiva = categoriaIn;
};

export let productoActivo = null;

export const setProductoActivo = (productIn) => {
  productoActivo = productIn;
};

// Traigo button search

const buttonSearch = document.getElementById("header_button_search");

buttonSearch.addEventListener("click", () => {
  const inputHeaderSearch = document.getElementById("header_input_search");
  const allProducts = getProductLocalStorage();
  // console.log(inputHeaderSearch.value);
  const result = allProducts.filter((el) =>
    el.nombre.toLowerCase().includes(inputHeaderSearch.value)
  );

  renderListProducts(result);
});

// Eliminar producto

const deleteButton = document.getElementById("popup_btn_delete");

deleteButton.addEventListener("click", () => {
  const allProducts = getProductLocalStorage();
  const resultDelete = allProducts.filter((el) => el.id !== productoActivo.id);
  localStorage.setItem("products", JSON.stringify(resultDelete));
  const NewProducts = getProductLocalStorage();
  renderListProducts(NewProducts);
  closeModal();
});
