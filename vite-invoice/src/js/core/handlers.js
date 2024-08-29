import { productRender } from "./product.js";
import { addRecordQuantity, createRecord, deleteRecord, subRecordQuantity, updateRecord, updateRecordTotal } from "./record.js";
import { createForm, inventorySheet, newProductCreateForm, productGroup, productSelect, recordTotal, rowGroup } from "./selector.js";
import { products } from "./variables.js";

export const createFormHandler =  (event) => {
    event.preventDefault();
    // console.log("U submit");
    // console.log(productSelect.value);
    // console.log(inputQuantity.valueAsNumber);

    const formData  =  new FormData(createForm)

    const currentProductId = parseInt(formData.get("productSelect"));
    const currentQuantity =  parseInt(formData.get("inputQuantity"));
    const currentProduct  =  products.find(el => el.id === currentProductId)
    // console.log(currentProduct);

    const rowExisted  = rowGroup.querySelector(`[row-product-id = '${currentProductId}']`)
    if(rowExisted){
    //  const currentQuantityElement  =  rowExisted.querySelector(".row-quantity");
    // const currentCost  =   rowExisted.querySelector(".row-cost");
    // const currentPrice  =   rowExisted.querySelector(".row-product-price")
    // currentQuantityElement.innerText  =  parseInt(currentQuantityElement.innerText) + currentQuantity;
    // currentCost.innerText   = currentPrice.innerText * currentQuantityElement.innerText;
    updateRecord(rowExisted.getAttribute("row-product-id"),currentQuantity)
    }else {
         rowGroup.append(createRecord(currentProduct,currentQuantity))
        }
        // updateRecordTotal();
        createForm.reset();
}

export const rowGroupHandler  = (event) => {
    if(event.target.classList.contains("row-del-btn")){
        deleteRecord(event);
    }else if(event.target.classList.contains("row-q-add")){
        addRecordQuantity(event);
        // this is confirm box not show
        // updateRecord(event.target.closest(".row").getAttribute("row-product-id"),+1);
    }else   if(event.target.classList.contains("row-q-sub")){
        subRecordQuantity(event);   
        // updateRecord(event.target.closest(".row").getAttribute("row-product-id"),-1);

    }
}

export const manangeInventoryHandler  = () => {
    // console.log("U click");
    inventorySheet.classList.toggle("-translate-x-full");
}


export const newProductCreateFormHandler = (event) => {
    event.preventDefault();
    // console.log("U click");
    const formData  =  new FormData(newProductCreateForm);
    const newProduct = {
        id:Date.now(),
        name:formData.get("new-product-name"),
        price:formData.get("new-product-price"),
    }
    // productGroup.append(createForm(newProduct));
    // productSelect.append(new Option(newProduct.name,newProduct.id));
    products.push(newProduct);
    productRender(products)
    newProductCreateForm.reset();

}

export const printBtnHandler  =  () => {
    window.print();
}