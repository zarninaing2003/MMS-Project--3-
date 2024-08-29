import initialRender from "./core/initialRender";
import listener from "./core/listeners";

class Shop {
    init(){
        console.log("Shop Start");
        initialRender();
        listener();
    }
}

export default Shop;