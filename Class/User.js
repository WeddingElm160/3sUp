import { Cart } from "./Cart"
export class User{
    carts
    constructor(user){
        if(user){
            this.carts = user.carts.map(cart => new Cart(cart))
        }else
            this.carts = []
    }

    addCart(storeName) {
        this.carts.unshift(new Cart(storeName))
    }

    removeCart() {
        this.carts.shift()
    }
}