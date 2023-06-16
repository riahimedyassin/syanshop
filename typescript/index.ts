type Product = {
    id:number;
    category : string ;
    description: string ; 
    price : number ; 
    rating : {
        rate : number ; 
        count :number ;
    }
    image : string ; 
    title : string ; 
}
type Cart = {
    id:number,
    image:string,
    title:string,
    price:string 
}
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
        clearPrevious()
        data.map((el : Product) => displayData(el));
        
    })
    .then( function() {
        eventListnnerCart()
    } )
    .catch(err => console.log(err))
}
const clearPrevious=() : void  => {
    let myRender=document.querySelector(".resRender") as HTMLDivElement;
    myRender.innerHTML="";
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
//LOCAL STORAGE
const initLocal=() : void => {
    if (!localStorage.cart) {
        localStorage.setItem("cart",JSON.stringify([]));
    }
}
const getLocal=() : Cart [] =>{
    const myLocal : Cart[] | [] = JSON.parse(localStorage.cart); 
    if (!myLocal) {
        initLocal();
        return [];
    }
    return myLocal;
}

const setLocal=(event : any) : void => {
    if(event.parentElement) {
        const myLocal=getLocal();
        const id=event.parentElement.getAttribute("id");
        const test=myLocal.some(el=> {
            el.id==id
        });
        if(!test) {
            let myProduct:Cart = {
                id:event.parentElement.getAttribute("id"),
                title:event.parentElement.children[1].children[0].innerHTML,
                price: event.parentElement.children[1].children[1].innerHTML,
                image: event.parentElement.children[0].src,
            }
            myLocal.push(myProduct)
            localStorage.cart=JSON.stringify(myLocal);
            displayCart(myLocal);
        }
}
}
const displayCart = (table: Cart[]) : void => {
    table.map(data=> {
        let myRender=document.querySelector(".cartRender") as HTMLDivElement;
        let myTitle = document.createElement("h4") as HTMLHeadElement;
        let myPrice = document.createElement("p")as HTMLParagraphElement;
        let myImage=document.createElement("img") as HTMLImageElement;
        let myHolder=document.createElement("div") as HTMLDivElement;
        myTitle.innerHTML=data.title;
        myPrice.innerHTML=data.price;
        myImage.src=data.image;
        myHolder.appendChild(myImage)
        myHolder.appendChild(myTitle)
        myHolder.appendChild(myPrice);
        myRender.appendChild(myHolder);
    })
}


//Calls 
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
