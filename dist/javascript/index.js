var _a;
import { clearPrevious } from "./ClearPrevious.js";
import { initLocal } from "./LocalStorage.js";
import { displayCart, setLocal } from "./Cart.js";
const displayData = (el) => {
    let myRender = document.querySelector(".resRender");
    let myHolder = document.createElement("div");
    let myTitle = document.createElement("h3");
    let myImg = document.createElement("img");
    myImg.src = el.image;
    myTitle.innerHTML = el.title;
    let myPrice = document.createElement("h4");
    myPrice.innerText = `£${el.price}`;
    let myCardHeader = document.createElement("div");
    myCardHeader.appendChild(myTitle);
    myCardHeader.appendChild(myPrice);
    myHolder.appendChild(myImg);
    myHolder.appendChild(myCardHeader);
    myRender.appendChild(myHolder);
    let myDescreption = document.createElement("p");
    myDescreption.innerHTML = `${el.description.substring(0, el.description.length / 4)}. . . READ MORE`;
    myHolder.appendChild(myDescreption);
    let myButton = document.createElement("button");
    myButton.innerHTML = "Add To Cart";
    myButton.classList.add("addToCart");
    myHolder.appendChild(myButton);
    myHolder.setAttribute("id", el.id.toString());
};
const fetchData = (urlParam) => {
    const url = urlParam;
    fetch(url)
        .then(res => res.json())
        .then(data => {
        clearPrevious("resRender");
        data.map((el) => displayData(el));
    })
        .then(function () {
        eventListnnerCart();
    })
        .catch(err => console.log(err));
};
const fetchCategories = () => {
    let myCategories = document.querySelector("#categorieFilter");
    let myCategValue = myCategories.value;
    if (myCategValue != "all") {
        let myUrl = `https://fakestoreapi.com/products/category/${parser(myCategValue)}`;
        fetchData(myUrl);
    }
    else {
        fetchData("https://fakestoreapi.com/products");
    }
};
const parser = (url) => {
    return url.replace(" ", "%20");
};
//Calls 
(_a = document.querySelector("#categorieFilter")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", () => {
    fetchCategories();
});
document.body.onload = () => {
    fetchData("https://fakestoreapi.com/products");
    initLocal();
    displayCart(JSON.parse(localStorage.cart));
};
let myCategories = document.querySelector("#categories");
myCategories.addEventListener("click", () => {
    let myList = document.querySelector(".categories");
    myList.classList.toggle("hidden");
});
const eventListnnerCart = () => {
    let myAddToCart = document.querySelectorAll(".addToCart");
    myAddToCart.forEach(el => {
        el.addEventListener("click", (el) => {
            setLocal(el.target);
        });
    });
};
//CART TOGGLE ; 
const myCart = document.querySelector(".cart");
const myCartToggler = document.querySelector(".cartToggler");
myCartToggler === null || myCartToggler === void 0 ? void 0 : myCartToggler.addEventListener("click", () => {
    myCart === null || myCart === void 0 ? void 0 : myCart.classList.toggle("hidden");
});
