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
    myHolder.appendChild(myButton);
    myHolder.setAttribute("id",el.id.toString());

}
const fetchData =() : void => {
    const url : string = "https://fakestoreapi.com/products"
    fetch(url)
    .then (res=>res.json())
    .then (data  => {
        data.map((el : Product) => displayData(el))
    })
    .catch(err => console.log(err))
}
const clearPrevious=() : void  => {
    let myRender=document.querySelector(".resRender") as HTMLDivElement;
    myRender.innerHTML="";
}

document.body.onload=fetchData; 
let myCategories = document.querySelector("#categories") as HTMLParagraphElement; 
myCategories.addEventListener("click",() : void => {
    let myList = document.querySelector(".categories") as HTMLUListElement ;
    myList.classList.toggle("hidden");
})