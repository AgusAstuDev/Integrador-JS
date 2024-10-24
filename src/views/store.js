import { openModal, setProductoActivo } from "../../main";
import { getProductLocalStorage } from "../persistence/localStorage";

export const viewGetProducts = () => {
  const products = getProductLocalStorage();
  renderListProducts(products);
};

export const renderListProducts = (productosIn) => {
  const burgers = productosIn.filter((el) => el.categoria === "Hamburguesas");
  const gaseosas = productosIn.filter((el) => el.categoria === "Gaseosas");
  const papas = productosIn.filter((el) => el.categoria === "Papas");

  // Renderizo una lista de productos por categoria
  const renderProductsGroup = (products, title) => {
    if (products.length > 0) {
      const productsHTML = products.map((producto, index) => {
        return `
                <div class="card_product" id="product-${producto.categoria}-${index}">
                    <div class="card_container_img"> 
                      <img src='${producto.img}' />
                    </div>
                    <div class="card_info_container">
                      <h3>${producto.nombre}</h3>
                      <p><strong>Precio:</strong> $${producto.precio}</p>
                      <p><strong>Tipo:</strong> ${producto.categoria}</p>
                    </div>
                </div>
                `;
      });
      return `
      <section class="section_category_cards_products">
          <h1>${title}</h1>
          <div class="store_grid_container"> 
              ${productsHTML.join("")}
          </div>
      </section>
      `;
    } else {
      return "";
    }
  };

  const storeContainer = document.getElementById("store_containerId");

  // Renderizamos los productos
  storeContainer.innerHTML = `
  ${renderProductsGroup(burgers, "Hamburguesas")}
  ${renderProductsGroup(gaseosas, "Gaseosas")}
  ${renderProductsGroup(papas, "Papas")}
  `;

  // Al hacer clic en el producto, lo vuelvo Activo
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
