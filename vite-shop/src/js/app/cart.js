import Swal from "sweetalert2";
import { cartCount, cartItemCount, cartItemTemplate, cartTotal, productGroup } from "../core/selectors"

export const createCartItem  =  (product,quantity) => {
    const template  = cartItemTemplate.content.cloneNode(true);
    template.querySelector(".cart-item").setAttribute("cart-product-id",product.id);
    template.querySelector(".cart-item-img").src  =  product.image;    
    template.querySelector(".cart-item-title").innerText  =  product.title;    
    template.querySelector(".cart-item-price").innerText  =  product.price;    
    template.querySelector(".cart-item-cost").innerText  =  product.price * quantity;    
    template.querySelector(".cart-item-quantity").innerText  = quantity;    
    return template;
}


export const cartCountItem = () => {
    const totalItemInCart  = document.querySelectorAll(".cart-item");
  return  totalItemInCart.length;
}

export const updateCartCountItem  =  () => {
  const currentTotal   = cartCountItem();
  cartItemCount.innerText  =  currentTotal;
  cartCount.innerText    = currentTotal;
}


export const calculatCartCostTotal  = () => {
    const total  =  [...document.querySelectorAll(".cart-item-cost")].reduce(
    (pv,cv) => pv+ parseFloat(cv.innerText),
    0
);
    return total;
}

export const updateCartTotal  =  () => {
    const total  =  calculatCartCostTotal().toFixed(2);
    cartTotal.innerText  = total;
}

export const handleCartItemGroup = (event) => {
    // console.log(event);
    if(event.target.classList.contains("cart-item-remove")){
        // console.log(event.target);
        const currentCart = event.target.closest(".cart-item")
        const currentProductId  =  currentCart.getAttribute("cart-product-id");
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
            }).then((result) => {
            if (result.isConfirmed) {
                currentCart.remove();
               const Toast = Swal.mixin({
                toast: true,
                position: "bottom-center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
                });
                Toast.fire({
                icon: "success",
                title: "Remove in successfully"
            });
            }
            updateCartCountItem();
            updateCartTotal();
            const currentProduct  = productGroup.querySelector(`[product-id = '${currentProductId}']`);
            if(currentProduct){
            const currentProductAddCartBtn = currentProduct.querySelector(".product-add-to-cart");
                currentProductAddCartBtn.removeAttribute("disabled");
                currentProductAddCartBtn.innerText = "Add to Cart";
            }
            
        });
    }else if(event.target.classList.contains("cart-q-add")){
        const currentCart = event.target.closest(".cart-item");
        const currentCost =  currentCart.querySelector(".cart-item-cost");
        const currentPrice =  currentCart.querySelector(".cart-item-price");
        const currentQuantity =  currentCart.querySelector(".cart-item-quantity");
        currentQuantity.innerText = parseInt( currentQuantity.innerText) + 1;
        currentCost.innerText  = (currentQuantity.innerText * currentPrice.innerText).toFixed(2);
            updateCartTotal();
            }else if(event.target.classList.contains("cart-q-sub")){
        const currentCart = event.target.closest(".cart-item");
        const currentCost =  currentCart.querySelector(".cart-item-cost");
        const currentPrice =  currentCart.querySelector(".cart-item-price");
        const currentQuantity =  currentCart.querySelector(".cart-item-quantity");
       
        if(currentQuantity.innerText>1){
             
        currentQuantity.innerText = parseInt( currentQuantity.innerText) - 1;
        currentCost.innerText  = (currentQuantity.innerText * currentPrice.innerText).toFixed(2);
            updateCartTotal();
        }
     }
}