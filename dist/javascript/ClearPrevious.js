export const clearPrevious = (className) => {
    let myRender = document.querySelector(`.${className}`);
    myRender.innerHTML = "";
};
