import { recordTotal, rowGroup, rowTemplate } from "./selector.js"

 export const createRecord  = ({id,name,price},quantity) => {
    const rowCost =  price * quantity
    const record   = rowTemplate.content.cloneNode(true);
    // record.querySelector(".row-no").innerText  = 1;
    record.querySelector(".row").setAttribute("row-product-id",id); 
    record.querySelector(".row-product-name").innerText  = name;
    record.querySelector(".row-product-price").innerText  =  price;
    record.querySelector(".row-quantity").innerText  =  quantity;
    record.querySelector(".row-cost").innerText  =  rowCost;

    return record;
}


    export const updateRecordTotal  =  () => {
          const allRowCost  =  document.querySelectorAll(".row-cost");
    // let total  = 0;
    // allRowCost.forEach(({innerText}) => total += parseFloat(innerText));
    recordTotal.innerText =  [...allRowCost].reduce((pv,{innerText}) => pv+ parseFloat(innerText),0);
    }
  
  export const deleteRecord  =  (event) => {
    // console.log(event.target);
    const row  =  event.target.closest(".row")
    // console.log(row);
    if(confirm("Are you sure to delete this row?")){
        row.remove();
        // updateRecordTotal();
    }
  }

  
  export const updateRecord  =  (productId,q) => {
     const row  = document.querySelector(`[row-product-id='${productId}']`)
   const currentQuantity  =  row.querySelector(".row-quantity");
   const currentCost  =   row.querySelector(".row-cost");
   const currentPrice  =   row.querySelector(".row-product-price")

   currentQuantity.innerText  =  parseInt(currentQuantity.innerText) +q;
   currentCost.innerText   = currentPrice.innerText * currentQuantity.innerText
  //  updateRecordTotal();
     
  }

  export const addRecordQuantity =  (event) => {
    const row  =  event.target.closest(".row")
   const currentQuantity  =  row.querySelector(".row-quantity");
   const currentCost  =   row.querySelector(".row-cost");
   const currentPrice  =   row.querySelector(".row-product-price")

   currentQuantity.innerText  =  parseInt(currentQuantity.innerText) + 1;
   currentCost.innerText   = currentPrice.innerText * currentQuantity.innerText
   updateRecordTotal();
  }


    export const subRecordQuantity =  (event) => {
    const row  =  event.target.closest(".row")
   const currentQuantity  =  row.querySelector(".row-quantity");
   const currentCost  =   row.querySelector(".row-cost");
   const currentPrice  =   row.querySelector(".row-product-price")
  if(currentQuantity.innerText > 1){
    currentQuantity.innerText  =  parseInt(currentQuantity.innerText) - 1;
   currentCost.innerText   = currentPrice.innerText * currentQuantity.innerText
   updateRecordTotal();
  }else{
    deleteRecord(event);
  }
  }


  export const recordObserver  =  () => {
    const run  =  () => {
      // console.log("U click change");
      updateRecordTotal();
    }

    const observerOptions  =   {
      childList  : true,
      subList: true,
    }


    const observer  =  new MutationObserver(run);
    observer.observe(rowGroup,observerOptions);
  }

  
