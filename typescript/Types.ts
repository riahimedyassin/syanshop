export type Product = {
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
export type Cart = {
    id:number,
    image:string,
    title:string,
    price:string 
}