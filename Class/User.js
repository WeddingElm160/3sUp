export class User{
    carts
    constructor(){
        this.carts = []
    }

    addCart(cart) {
        this.carts.push(cart);
    }
}