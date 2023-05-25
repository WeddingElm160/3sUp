export class User{
    carts
    constructor(){
        this.carts = []
    }

    addCart(cart) {
        this.carts.unshift(cart)
    }

    removeCart() {
        this.carts.shift()
    }
}