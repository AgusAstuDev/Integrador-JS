import { setInLocalStorage } from "./src/persistence/localStorage";
import { renderCategories } from "./src/services/categories";
import { viewGetProducts } from "./src/views/store";
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
