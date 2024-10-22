import { setInLocalStorage } from "./src/persistence/localStorage";
import { renderCategories } from "./src/services/categories";
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

const openModal = () => {
  const modal = document.getElementById("modal_popup");
  modal.style.display = "flex";
};

const closeModal = () => {
  const modal = document.getElementById("modal_popup");
  modal.style.display = "none";
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

  let object = {
    id: new Date().toISOString(),
    nombre,
    precio,
    img,
    categoria,
  };
  setInLocalStorage(object);

  //   closeModal();
};
