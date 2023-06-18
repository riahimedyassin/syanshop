export const clearPrevious=(className: string) : void  => {
    let myRender=document.querySelector(`.${className}`) as HTMLDivElement;
    myRender.innerHTML="";
}