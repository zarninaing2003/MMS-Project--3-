// Selectors

const app  =  document.querySelector("#app");
const textInput   =  document.querySelector("#textInput");
const addBtn  =  document.querySelector("#addBtn");
const listGroup  = document.querySelector("#listGroup");
const countTotal  = document.querySelector("#totalCount");
const doneTotal  = document.querySelector("#doneCount");
const listUI  = document.querySelector("#listUi");



const updateCount =  () => {
    countTotal.innerText  =  countListTotal();
    doneTotal.innerText =  countDoneListTotal();
}

const countListTotal   = () => {
    return  document.querySelectorAll(".list").length;
}


const countDoneListTotal   = () => {
    return  document.querySelectorAll(".list .list-checkbox:checked").length;
}


// function
const createList  =  (text) => {
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

// handler
    const addList  = () => {

    // add to ui
    listGroup.append(createList(textInput.value));
    
    // countTotal.innerText  =  parseInt(countTotal.innerText) + 1;
    updateCount(); 

    // remove list
    textInput.value =  null;

}

const deleteList  = (event) => {
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

const editList = (event) => {
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

const updateList = (event) => {
    console.log("U update");
    const currentValue  =  event.target.value;
    const list  =  event.target.closest(".list");
    const listText  = list.querySelector(".list-text");
    listText.innerText  = currentValue;

    event.target.remove();
    listText.classList.toggle("hidden");
    // console.log(event.target);
}



// listener
addBtn.addEventListener("click",addList);
textInput.addEventListener("keyup",(event) => event.key === "Enter"  && addList())
