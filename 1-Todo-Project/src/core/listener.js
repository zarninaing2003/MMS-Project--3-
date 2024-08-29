import { addList } from "./handler.js";

const listener  =  () => {
addBtn.addEventListener("click",addList);
textInput.addEventListener("keyup",(event) => event.key === "Enter"  && addList())
}

export default listener;