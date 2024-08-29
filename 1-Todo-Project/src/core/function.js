import { deleteList, editList } from "./handler.js";
import { countTotal, doneTotal, listUI } from "./selectors.js";

 export const updateCount =  () => {
    countTotal.innerText  =  countListTotal();
    doneTotal.innerText =  countDoneListTotal();
}

 export const countListTotal   = () => {
    return  document.querySelectorAll(".list").length;
}


 export const countDoneListTotal   = () => {
    return  document.querySelectorAll(".list .list-checkbox:checked").length;
}


// function
 export const createList  =  (text) => {
  const list =  listUI.content.cloneNode(true);
  const listText =  list.querySelector(".list-text");
  const delBtn  =  list.querySelector(".list-del-btn");
  const listEditBtn  =  list.querySelector(".list-edit-btn");
  const listCheckbox  = list.querySelector(".list-checkbox");

  listText.innerText =  text;
  

    // Delete Btn
    delBtn.addEventListener("click",deleteList);
    listEditBtn.addEventListener("click",editList)

         listCheckbox.addEventListener("click",() => {
            listText.classList.toggle("line-through");
            // console.log(" U checked");
            updateCount();
         })
            return  list;
    };