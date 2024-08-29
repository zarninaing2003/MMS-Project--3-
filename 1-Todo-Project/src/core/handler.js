import { createList, updateCount } from "./function.js";

  export const addList  = () => {

    // add to ui
    listGroup.append(createList(textInput.value));
    
    // countTotal.innerText  =  parseInt(countTotal.innerText) + 1;
    updateCount(); 

    // remove list
    textInput.value =  null;

}

 export const deleteList  = (event) => {
    const list  =  event.target.closest(".list");
    if(confirm("Are your sure to delete this list")){
        list.remove();
        updateCount();
    }
    // console.log(list);
    // console.log(event.target.parentElement.parentElement.parentElement);
    // console.log(event.target);
    // console.log("U delete");
}

 export const editList = (event) => {
    console.log(" U Edit Btn");
    const list = event.target.closest(".list");
    const listText  = list.querySelector(".list-text");
    const input  =  document.createElement("input");
    input.className  =  "border border-zinc-700 focus-visible-none px-3";
    input.value  =  listText.innerText;
    listText.after(input);
    input.focus();
    listText.classList.toggle("hidden");

    input.addEventListener("blur",updateList)
}

 export const updateList = (event) => {
    console.log("U update");
    const currentValue  =  event.target.value;
    const list  =  event.target.closest(".list");
    const listText  = list.querySelector(".list-text");
    listText.innerText  = currentValue;

    event.target.remove();
    listText.classList.toggle("hidden");
    // console.log(event.target);
}
