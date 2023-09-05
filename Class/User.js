import { Cart } from "./Cart"
export class User{
    email;carts;
    constructor(user, email){
        if(user){
            this.carts = user.carts.map(cart => new Cart(cart));
        }else{
            this.carts = [];
        }
        this.email = email;
    }

    setEmail(newEmail){
        this.email = newEmail;
    }

    addCart(storeName) {
        this.carts.unshift(new Cart(storeName))
    }

    removeCart() {
        this.carts.shift()
    }
}