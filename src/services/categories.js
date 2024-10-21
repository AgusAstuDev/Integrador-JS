export const renderCategories = () => {
  // Creación de los elementos
  const ulList = document.querySelector("#listFilter");
  ulList.innerHTML = `
    <li id="Todo">Todos los productos</li> 
    <li id="Hamburguesas">Hamburguesas</li> 
    <li id="Papas">Papas</li> 
    <li id="Gaseosas">Gaseosas</li> 
    <li id="Mayor_precio">Mayor precio</li> 
    <li id="Menor_precio">Menor precio</li> 
    `;

  // liElements es el array que contiene a todos los li de ulList
  const liElements = ulList.querySelectorAll("li");

  // Agrego dinámicamente eventos clic a todos mis li de ulList
  liElements.forEach((liElement) => {
    liElement.addEventListener("click", () => {
      handleClick(liElement);
    });
  });
  // Manejo el evento de clic agregando o sacando liActive condicionalmente
  const handleClick = (elemento) => {
    liElements.forEach((el) => {
      if (el.classList.contains("liActive")) {
        el.classList.remove("liActive");
      } else {
        if (el === elemento) el.classList.add("liActive");
      }
    });
  };
};
