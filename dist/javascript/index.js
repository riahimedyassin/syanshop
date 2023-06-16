"use strict";
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
        clearPrevious();
        data.map((el) => displayData(el));
    })
        .then(function () {
        eventListnnerCart();
    })
        .catch(err => console.log(err));
};
const clearPrevious = () => {
    let myRender = document.querySelector(".resRender");
    myRender.innerHTML = "";
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
//LOCAL STORAGE
const initLocal = () => {
    if (!localStorage.cart) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
};
const getLocal = () => {
    const myLocal = JSON.parse(localStorage.cart);
    if (!myLocal) {
        initLocal();
        return [];
    }
    return myLocal;
};
const setLocal = (event) => {
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
const displayCart = (table) => {
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
//Calls 
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
