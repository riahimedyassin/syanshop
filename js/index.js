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
        clearPrevious();
        data.map(function (el) { return displayData(el); });
    })
        .then(function () {
        eventListnnerCart();
    })["catch"](function (err) { return console.log(err); });
};
var clearPrevious = function () {
    var myRender = document.querySelector(".resRender");
    myRender.innerHTML = "";
};
var fetchCategories = function () {
    var myCategories = document.querySelector("#categorieFilter");
    var myCategValue = myCategories.value;
    if (myCategValue != "all") {
        var myUrl = "https://fakestoreapi.com/products/category/".concat(parser(myCategValue));
        fetchData(myUrl);
    }
    else {
        fetchData("https://fakestoreapi.com/products");
    }
};
var parser = function (url) {
    return url.replace(" ", "%20");
};
//LOCAL STORAGE
var initLocal = function () {
    if (!localStorage.cart) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
};
var getLocal = function () {
    var myLocal = JSON.parse(localStorage.cart);
    if (!myLocal) {
        initLocal();
        return [];
    }
    return myLocal;
};
var setLocal = function (event) {
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
var displayCart = function (table) {
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
