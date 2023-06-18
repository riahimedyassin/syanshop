import { clearPrevious } from "./ClearPrevious.js";
import { getLocal } from "./LocalStorage.js";
export var displayCart = function (table) {
    clearPrevious("cartRender");
    table.map(function (data) {
        var myRender = document.querySelector(".cartRender");
        var myTitle = document.createElement("h4");
        var myPrice = document.createElement("p");
        var myImage = document.createElement("img");
        var myHolder = document.createElement("div");
        myTitle.innerHTML = data.title;
        myPrice.innerHTML = data.price;
        myImage.src = data.image;
        myHolder.appendChild(myImage);
        myHolder.appendChild(myTitle);
        myHolder.appendChild(myPrice);
        myRender.appendChild(myHolder);
    });
};
export var setLocal = function (event) {
    if (event.parentElement) {
        var myLocal = getLocal();
        var id_1 = event.parentElement.getAttribute("id");
        var test = myLocal.some(function (el) {
            el.id == id_1;
        });
        if (!test) {
            var myProduct = {
                id: event.parentElement.getAttribute("id"),
                title: event.parentElement.children[1].children[0].innerHTML,
                price: event.parentElement.children[1].children[1].innerHTML,
                image: event.parentElement.children[0].src
            };
            myLocal.push(myProduct);
            localStorage.cart = JSON.stringify(myLocal);
            displayCart(myLocal);
        }
    }
};
export var deleteLocal = function (event) {
    if (event.parentElement) {
        var myLocal = getLocal();
        var id_2 = event.parentElement.getAttribute("id");
        var test = myLocal.some(function (el) {
            el.id == id_2;
        });
    }
};
