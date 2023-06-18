export var initLocal = function () {
    if (!localStorage.cart) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
};
export var getLocal = function () {
    var myLocal = JSON.parse(localStorage.cart);
    if (!myLocal) {
        initLocal();
        return [];
    }
    return myLocal;
};
