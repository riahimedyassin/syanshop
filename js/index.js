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
    myHolder.appendChild(myButton);
    myHolder.setAttribute("id", el.id.toString());
};
var fetchData = function () {
    var url = "https://fakestoreapi.com/products";
    fetch(url)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        data.map(function (el) { return displayData(el); });
    })["catch"](function (err) { return console.log(err); });
};
var clearPrevious = function () {
    var myRender = document.querySelector(".resRender");
    myRender.innerHTML = "";
};
document.body.onload = fetchData;
var myCategories = document.querySelector("#categories");
myCategories.addEventListener("click", function () {
    var myList = document.querySelector(".categories");
    myList.classList.toggle("hidden");
});
