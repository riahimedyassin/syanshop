import { Cart } from "./Types.js";
import { clearPrevious } from "./ClearPrevious.js";
import { getLocal } from "./LocalStorage.js";
export const displayCart = (table: Cart[]) : void => {
    clearPrevious("cartRender")
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
export const setLocal=(event : any) : void => {
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
export const deleteLocal=(event:any):void => {
    if(event.parentElement) {
        const myLocal=getLocal();
        const id=event.parentElement.getAttribute("id");
        const test=myLocal.some(el=> {
            el.id==id
        });
}
}