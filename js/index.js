import { clearPrevious } from "./ClearPrevious.js";
import { initLocal } from "./LocalStorage.js";
import { displayCart, setLocal } from "./Cart.js";
var displayData = function (el) {
    var myRender = document.querySelector(".resRender");
    var myHolder = document.createElement("div");
    var myTitle = document.createElement("h3");
    var myImg = document.createElement("img");
    myImg.src = el.image;
    myTitle.innerHTML = el.title;
    var myPrice = document.createElement("h4");
    myPrice.innerText = "\u00A3".concat(el.price);
    var myCardHeader = document.createElement("div");
    myCardHeader.appendChild(myTitle);
    myCardHeader.appendChild(myPrice);
    myHolder.appendChild(myImg);
    myHolder.appendChild(myCardHeader);
    myRender.appendChild(myHolder);
    var myDescreption = document.createElement("p");
    myDescreption.innerHTML = "".concat(el.description.substring(0, el.description.length / 4), ". . . READ MORE");
    myHolder.appendChild(myDescreption);
    var myButton = document.createElement("button");
    myButton.innerHTML = "Add To Cart";
    myButton.classList.add("addToCart");
    myHolder.appendChild(myButton);
    myHolder.setAttribute("id", el.id.toString());
};
var fetchData = function (urlParam) {
    var url = urlParam;
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        clearPrevious("resRender");
        data.map(function (el) { return displayData(el); });
    })
        .then(function () {
        eventListnnerCart();
    })["catch"](function (err) { return console.log(err); });
};
// const fetchCategories=():void => {
//     let myCategories = document.querySelector("#categorieFilter") as HTMLSelectElement; 
//     let myCategValue=myCategories.value;
//     if (myCategValue!="all") {
//         let myUrl = `https://fakestoreapi.com/products/category/${parser(myCategValue)}`;
//         fetchData(myUrl);
//     }
//     else {
//         fetchData("https://fakestoreapi.com/products")
//     }
// }
// const parser=(url : string) : string => {
//     return url.replace(" ","%20")
// }
//Calls 
document.body.onload = function () {
    fetchData("https://fakestoreapi.com/products");
    initLocal();
    displayCart(JSON.parse(localStorage.cart));
};
var myCategories = document.querySelector("#categories");
myCategories.addEventListener("click", function () {
    var myList = document.querySelector(".categories");
    myList.classList.toggle("hidden");
});
var eventListnnerCart = function () {
    var myAddToCart = document.querySelectorAll(".addToCart");
    myAddToCart.forEach(function (el) {
        el.addEventListener("click", function (el) {
            setLocal(el.target);
        });
    });
};
//CART TOGGLE ; 
var myCart = document.querySelector(".cart");
var myCartToggler = document.querySelector(".cartToggler");
myCartToggler === null || myCartToggler === void 0 ? void 0 : myCartToggler.addEventListener("click", function () {
    myCart === null || myCart === void 0 ? void 0 : myCart.classList.toggle("hidden");
});
