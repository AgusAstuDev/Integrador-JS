import {
  getProductLocalStorage,
  setInLocalStorage,
} from "./src/persistence/localStorage";
import { renderCategories } from "./src/services/categories";
import { renderListProducts, viewGetProducts } from "./src/views/store";
import Swal from "sweetalert2";
import "./style.css";

// Renderizo las categorías y los productos almacenados
renderCategories();
viewGetProducts();

// Variables globales de estado
export let categoriaActiva = null;
export let productoActivo = null;

// Funciones para setear estados
export const setCategoriaActiva = (categoriaIn) => {
  categoriaActiva = categoriaIn;
};
export const setProductoActivo = (productIn) => {
  productoActivo = productIn;
};

// POPUP: Apertura y cierre del modal
const button_add = document.getElementById("header_btn_add");
const modal = document.getElementById("modal_popup");
const button_delete = document.getElementById("popup_btn_delete");
const accept_button = document.getElementById("popup_btn_accept");
const cancel_button = document.getElementById("popup_btn_close");

button_add.addEventListener("click", () => {
  openModal();
});

export const openModal = () => {
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

    button_delete.style.display = "block";
  } else {
    button_delete.style.display = "none";
  }
};

export const closeModal = () => {
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
  precio.value = "";
  img.value = "";
  categoria.value = "Seleccione una categoria";
};

// Lógica de los botones del POPUP
accept_button.addEventListener("click", () => {
  handleSaveModifyProduct();
  const allProducts = getProductLocalStorage();
  renderListProducts(allProducts);
});

cancel_button.addEventListener("click", () => {
  closeModal();
});

button_delete.addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      const allProducts = getProductLocalStorage();
      const resultDelete = allProducts.filter(
        (el) => el.id !== productoActivo.id
      );
      localStorage.setItem("products", JSON.stringify(resultDelete));
      const NewProducts = getProductLocalStorage();
      renderListProducts(NewProducts);
      closeModal();
    }
  });
});

const handleSaveModifyProduct = () => {
  const nombre = document.getElementById("nombre").value,
    precio = document.getElementById("precio").value,
    img = document.getElementById("img").value,
    categoria = document.getElementById("categoria").value;

  const newProduct = {
    id: productoActivo ? productoActivo.id : new Date().toISOString(),
    nombre,
    precio,
    img,
    categoria,
  };
  setInLocalStorage(newProduct);
  closeModal();
  renderListProducts(getProductLocalStorage());
};

// LÓGICA DE LA BÚSQUEDA
const buttonSearch = document.getElementById("header_button_search");
const inputSearchCamp = document.getElementById("header_input_search");

inputSearchCamp.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const allProducts = getProductLocalStorage();
    const result = allProducts.filter((el) =>
      el.nombre.toLowerCase().includes(inputSearchCamp.value.toLowerCase())
    );

    renderListProducts(result);
  }
});

buttonSearch.addEventListener("click", () => {
  const allProducts = getProductLocalStorage();
  const result = allProducts.filter((el) =>
    el.nombre.toLowerCase().includes(inputSearchCamp.value.toLowerCase())
  );

  renderListProducts(result);
});
