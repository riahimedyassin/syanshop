export const initLocal = () => {
    if (!localStorage.cart) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
};
export const getLocal = () => {
    const myLocal = JSON.parse(localStorage.cart);
    if (!myLocal) {
        initLocal();
        return [];
    }
    return myLocal;
};
