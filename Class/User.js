import { Cart } from "./Cart"
export class User{
    carts
    constructor(user){
        if(user){
            this.carts = user.carts.map(cart => new Cart(cart))
        }else
            this.carts = []
    }

    addCart() {
        this.carts.unshift(new Cart())
    }

    removeCart() {
        this.carts.shift()
    }
}