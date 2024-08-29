import { products } from "../core/data";
import { cartCount, cartItemGroup, openDrawer, productGroup, productTemplate } from "../core/selectors"
import { cartCountItem,  createCartItem, updateCartCountItem, updateCartTotal } from "./cart";


export const renderStar  = (rate) => {
      let stars =  "";

    for(let i=1;i<=5;i++){
        stars += `<svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 ${i<= Math.round(rate) ? "fill-blue-400" : "fill-gray-200"}"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>`
    }
    return stars;
}

export const createProduct  =  (product) => {
    const template =  productTemplate.content.cloneNode(true);
    template.querySelector(".product-card").setAttribute("product-id",product.id)
    template.querySelector(".product-img").src  = product.image;
    template.querySelector(".product-title").innerText  = product.title;
    template.querySelector(".product-price").innerText  = product.price;
    template.querySelector(".product-description").innerText  = product.description;
    template.querySelector(".product-rate").innerText  =`(${product.rating.rate} / ${product.rating.count} )`;

  
    template.querySelector(".product-star").innerHTML   = renderStar(product.rating.rate);

    const isExistedInCart  = cartItemGroup.querySelector(`[cart-product-id = '${product.id}']`);
    if(isExistedInCart){
      template.querySelector(".product-add-to-cart").setAttribute("disabled",true);
      template.querySelector(".product-add-to-cart").innerText  =  "Added";
    }
    return template;
}

export const renderProduct  =  (products) => {
    productGroup.innerHTML  =  "";
    products.forEach((product) => productGroup.append(createProduct(product)))
}


export const productGroupHandler  = (event) => {
    // console.log(event.target);
    if(event.target.classList.contains("product-add-to-cart")){
      const currentBtn = event.target;
      currentBtn.setAttribute("disabled",true);
      currentBtn.innerText = "Added";
        const currentProductCard  =  event.target.closest(".product-card")
        const currentProductCardId = parseInt(currentProductCard.getAttribute("product-id"));
        // console.log(currentProductCardId);
        const currentProductCardImg  =  currentProductCard.querySelector(".product-img");
        // console.log(currentProductCardImg);

        // console.log(openDrawer.getBoundingClientRect());
        
        const animateImg  =  new Image();
        animateImg.src = currentProductCardImg.src;
        animateImg.style.position = "fixed";
        animateImg.style.top = currentProductCardImg.getBoundingClientRect().top + "px";
        animateImg.style.left = currentProductCardImg.getBoundingClientRect().left + "px";
        animateImg.style.width = currentProductCardImg.getBoundingClientRect().width + "px";
        animateImg.style.height = currentProductCardImg.getBoundingClientRect().height + "px";
        document.body.append(animateImg)
        // console.log(animateImg);

        const keyframes  = [
          {
            top:currentProductCardImg.getBoundingClientRect().top + "px",
            left: currentProductCardImg.getBoundingClientRect().left + "px",
          },
          {
            top: openDrawer.querySelector("svg").getBoundingClientRect().top + "px",
            left: openDrawer.querySelector("svg").getBoundingClientRect().left + "px",
            height: "0px",
            width: "0px",
            transform : "rotate(2turn)"
          }
        ];
        const duration  = 500;

        const addToCartAnimation  = animateImg.animate(keyframes,duration);

        const handleAnimationFish =  () => {
          animateImg.remove();
          openDrawer.classList.add("animate__tada")
          openDrawer.addEventListener("animationend",() => {
          openDrawer.classList.remove("animate__tada")
          })
          cartItemGroup.append(createCartItem(currentProduct,1));
             updateCartCountItem();
             updateCartTotal();
        }

        addToCartAnimation.addEventListener("finish",handleAnimationFish);




        const currentProduct  = products.find((product) => product.id=== currentProductCardId)
       
        // cartCountItem()
        // console.log(currentProduct);
    }
    
}

