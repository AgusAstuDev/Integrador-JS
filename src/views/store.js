import { openModal, setProductoActivo } from "../../main";
import { getProductLocalStorage } from "../persistence/localStorage";

export const viewGetProducts = () => {
  const products = getProductLocalStorage();
  renderListProducts(products);
};

export const renderListProducts = (productosIn) => {
  // Primero filtro todos los productos traidos
  const burgers = productosIn.filter((el) => el.categoria === "Hamburguesas");
  const gaseosas = productosIn.filter((el) => el.categoria === "Gaseosas");
  const papas = productosIn.filter((el) => el.categoria === "Papas");

  // Creo la función que renderiza una lista de productos por grupo
  const renderProductsGroup = (products, title) => {
    if (products.length > 0) {
      const productsHTML = products.map((producto, index) => {
        return `
                <div id="product-${producto.categoria}-${index}">
                    <div> 
                        <img src='${producto.img}' />
                    </div>
                    <div>
                        <h2>Nombre: ${producto.nombre}</h2>
                    </div>
                    <div>
                        <p>Precio: ${producto.precio}</p>
                    </div>
                    <div>
                        <p>Categoria: ${producto.categoria}</p>
                    </div>
                </div>
                `;
      });
      return `
      <section>
          <h3>${title}</h3>
          <div> 
              ${productsHTML.join("")}
          </div>
      </section>
      `;
    } else {
      return "";
    }
  };

  //   Renderizamos los productos
  const storeContainer = document.getElementById("store_containerId");

  storeContainer.innerHTML = `
  ${renderProductsGroup(burgers, "Hamburguesas")}
  ${renderProductsGroup(gaseosas, "Gaseosas")}
  ${renderProductsGroup(papas, "Papas")}
  `;

  //   Añadimos eventos
  const adEvents = (productsIn) => {
    if (productsIn) {
      productsIn.forEach((producto, index) => {
        const productContainer = document.getElementById(
          `product-${producto.categoria}-${index}`
        );
        productContainer.addEventListener("click", () => {
          setProductoActivo(producto);
          openModal();
        });
      });
    }
  };
  adEvents(burgers);
  adEvents(gaseosas);
  adEvents(papas);
};
