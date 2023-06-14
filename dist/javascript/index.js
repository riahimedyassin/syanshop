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
    myHolder.appendChild(myButton);
    myHolder.setAttribute("id", el.id.toString());
};
const fetchData = () => {
    const url = "https://fakestoreapi.com/products";
    fetch(url)
        .then(res => res.json())
        .then(data => {
        data.map((el) => displayData(el));
    })
        .catch(err => console.log(err));
};
const clearPrevious = () => {
    let myRender = document.querySelector(".resRender");
    myRender.innerHTML = "";
};
document.body.onload = fetchData;
let myCategories = document.querySelector("#categories");
myCategories.addEventListener("click", () => {
    let myList = document.querySelector(".categories");
    myList.classList.toggle("hidden");
});
