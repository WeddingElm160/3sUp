export class Cart{
    receipt; products;
    constructor(){
        this.products = []
        this.receipt = {
            budget: 0,
            subtotal: 0,
            change: 0
        }
    }

    setBudget(budget){
        this.receipt.budget=budget;
    }
    
    addProduct(product){
        push(product);
        this.receipt.subtotal = product.price;
        this.receipt.change = this.receipt.budget ? (this.receipt.budget - this.receipt.subtotal) : 0
    }

    removeProduct(key){
        product = array.splice(key, 1)
        this.receipt.subtotal = product.price;
        this.receipt.change = this.receipt.budget ? (this.receipt.budget + this.receipt.subtotal) : 0
    }
}