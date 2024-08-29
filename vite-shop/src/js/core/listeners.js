import { handleCartItemGroup } from "../app/cart";
import { handleCategoryGroup } from "../app/category";
import { productGroupHandler } from "../app/product";
import { cartItemGroup, categoryGroup, productGroup } from "./selectors";

const listener  =  () => {
    categoryGroup.addEventListener("click",handleCategoryGroup)
    productGroup.addEventListener("click",productGroupHandler)
    cartItemGroup.addEventListener("click",handleCartItemGroup)
}

export default listener;