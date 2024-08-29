import { createFormHandler, manangeInventoryHandler, newProductCreateFormHandler, printBtnHandler, rowGroupHandler } from "./handlers.js"
import { createForm, inventorySheetBtn, manangeInventoryBtn, newProductCreateForm, rowGroup } from "./selector.js"

const listener  = () => {
    createForm.addEventListener("submit",createFormHandler);
    rowGroup.addEventListener("click",rowGroupHandler);
    manangeInventoryBtn.addEventListener("click",manangeInventoryHandler)
    inventorySheetBtn.addEventListener("click",manangeInventoryHandler)
    newProductCreateForm.addEventListener("submit",newProductCreateFormHandler)
    printBtn.addEventListener("click",printBtnHandler)
}

export default listener;