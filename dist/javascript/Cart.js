import { clearPrevious } from "./ClearPrevious.js";
import { getLocal } from "./LocalStorage.js";
export const displayCart = (table) => {
    clearPrevious("cartRender");
    table.map(data => {
        let myRender = document.querySelector(".cartRender");
        let myTitle = document.createElement("h4");
        let myPrice = document.createElement("p");
        let myImage = document.createElement("img");
        let myHolder = document.createElement("div");
        myTitle.innerHTML = data.title;
        myPrice.innerHTML = data.price;
        myImage.src = data.image;
        myHolder.appendChild(myImage);
        myHolder.appendChild(myTitle);
        myHolder.appendChild(myPrice);
        myRender.appendChild(myHolder);
    });
};
export const setLocal = (event) => {
    if (event.parentElement) {
        const myLocal = getLocal();
        const id = event.parentElement.getAttribute("id");
        const test = myLocal.some(el => {
            el.id == id;
        });
        if (!test) {
            let myProduct = {
                id: event.parentElement.getAttribute("id"),
                title: event.parentElement.children[1].children[0].innerHTML,
                price: event.parentElement.children[1].children[1].innerHTML,
                image: event.parentElement.children[0].src,
            };
            myLocal.push(myProduct);
            localStorage.cart = JSON.stringify(myLocal);
            displayCart(myLocal);
        }
    }
};
export const deleteLocal = (event) => {
    if (event.parentElement) {
        const myLocal = getLocal();
        const id = event.parentElement.getAttribute("id");
        const test = myLocal.some(el => {
            el.id == id;
        });
    }
};
