import {Cart } from "./Types.js";
export const initLocal=() : void => {
    if (!localStorage.cart) {
        localStorage.setItem("cart",JSON.stringify([]));
    }
}
export const getLocal=() : Cart [] =>{
    const myLocal : Cart[] | [] = JSON.parse(localStorage.cart); 
    if (!myLocal) {
        initLocal();
        return [];
    }
    return myLocal;
}