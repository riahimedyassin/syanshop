import { clearPrevious } from "./ClearPrevious.js"
import { Cart , Product} from "./Types.js";
import { initLocal , getLocal } from "./LocalStorage.js";
import { displayCart ,setLocal} from "./Cart.js";
const displayData=(el:Product):void => {
    let myRender=document.querySelector(".resRender") as HTMLDivElement;
    let myHolder = document.createElement("div") as HTMLDivElement;
    let myTitle=document.createElement("h3") as HTMLHeadElement;
    let myImg = document.createElement("img") as HTMLImageElement;
    myImg.src =el.image;
    myTitle.innerHTML=el.title;
    let myPrice = document.createElement("h4") as HTMLHeadElement;
    myPrice.innerText=`£${el.price}`;
    let myCardHeader = document.createElement("div") as HTMLDivElement;
    myCardHeader.appendChild(myTitle);
    myCardHeader.appendChild(myPrice)
    myHolder.appendChild(myImg);
    myHolder.appendChild(myCardHeader);
    myRender.appendChild(myHolder);
    let myDescreption = document.createElement("p") as HTMLParagraphElement;    
    myDescreption.innerHTML=`${el.description.substring(0,el.description.length/4)}. . . READ MORE`;
    myHolder.appendChild(myDescreption);
    let myButton=document.createElement("button") as HTMLButtonElement;
    myButton.innerHTML="Add To Cart";
    myButton.classList.add("addToCart")
    myHolder.appendChild(myButton);
    myHolder.setAttribute("id",el.id.toString());

}
const fetchData =(urlParam : string) : void => {
    const url : string = urlParam 
    fetch(url)
    .then (res=>res.json())
    .then (data  => {
        clearPrevious("resRender")
        data.map((el : Product) => displayData(el));
        
    })
    .then( function() {
        eventListnnerCart()
    } )
    .catch(err => console.log(err))
}

const fetchCategories=():void => {
    let myCategories = document.querySelector("#categorieFilter") as HTMLSelectElement; 
    let myCategValue=myCategories.value;
    if (myCategValue!="all") {
        let myUrl = `https://fakestoreapi.com/products/category/${parser(myCategValue)}`;
        fetchData(myUrl);
    }
    else {
        fetchData("https://fakestoreapi.com/products")
    }
}
const parser=(url : string) : string => {
    return url.replace(" ","%20")
}



//Calls 
document.querySelector("#categorieFilter")?.addEventListener("change",() => {
    fetchCategories();
})
document.body.onload= () : void => {
    fetchData("https://fakestoreapi.com/products");
    initLocal();
    displayCart(JSON.parse(localStorage.cart));
}; 
let myCategories = document.querySelector("#categories") as HTMLParagraphElement; 
myCategories.addEventListener("click",() : void => {
    let myList = document.querySelector(".categories") as HTMLUListElement ;
    myList.classList.toggle("hidden");
})
const eventListnnerCart=() :void => {
    let myAddToCart=document.querySelectorAll(".addToCart") ; 
    myAddToCart.forEach(el=> {
        el.addEventListener("click", (el) => {
            setLocal(el.target)
        })
    })
}
//CART TOGGLE ; 
    const myCart=document.querySelector(".cart"); 
    const myCartToggler=document.querySelector(".cartToggler")
    myCartToggler?.addEventListener("click",() => {
        myCart?.classList.toggle("hidden")
    })


