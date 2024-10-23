import { categoriaActiva } from "../../main";
import { getProductLocalStorage } from "../persistence/localStorage";
import { renderListProducts } from "../views/store";

// Función que filtra por categoría pasando el id
const filterByCategory = (idCategory) => {
  // Traigo todos mis elementos de localeStorage
  const allProducts = getProductLocalStorage();

  switch (idCategory) {
    case "Todo":
      renderListProducts(allProducts);
      break;
    case "Hamburguesas":
    case "Papas":
    case "Gaseosas":
      const result = allProducts.filter((el) => el.categoria === idCategory);
      renderListProducts(result);
      break;
    case "Mayor_precio":
      const resultMayor = allProducts.sort((a, b) => b.precio - a.precio);
      console.log(resultMayor);
      renderListProducts(resultMayor);
      break;
    case "Menor_precio":
      const resultMenor = allProducts.sort((a, b) => a.precio - b.precio);
      console.log(resultMenor);
      renderListProducts(resultMenor);
      break;
    default:
      break;
  }
};

// Función que renderiza las categorías
export const renderCategories = () => {
  const ulList = document.getElementById("listFilter");

  ulList.innerHTML = `
    <li id="Todo">Todos los productos</li> 
    <li id="Hamburguesas">Hamburguesas</li> 
    <li id="Papas">Papas</li> 
    <li id="Gaseosas">Gaseosas</li> 
    <li id="Mayor_precio">Mayor precio</li> 
    <li id="Menor_precio">Menor precio</li> 
    `;

  const liElements = ulList.querySelectorAll("li");

  // Agrego dinámicamente un manejador de clic a cada elemento de mi lista ulList
  liElements.forEach((liElement) => {
    liElement.addEventListener("click", () => {
      handleClick(liElement);
    });
  });

  // Filtro por categoría. Agrego y saco la clase liActive para manejarlo con los estilos
  const handleClick = (elemento) => {
    filterByCategory(elemento.id);

    liElements.forEach((el) => {
      if (el.classList.contains("liActive")) {
        el.classList.remove("liActive");
      } else {
        if (el === elemento) el.classList.add("liActive");
      }
    });
  };
};
