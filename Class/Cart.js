import Product from './Product'
export class Cart {
  receipt; products; productIndex;
  constructor(cart) {
    if (cart) {
      this.receipt = {
        budget: parseFloat(cart.receipt.budget),
        subtotal: parseFloat(cart.receipt.subtotal),
        change: parseFloat(cart.receipt.change)
      } 
      this.products = cart.products.map(product => new Product(product))
      this.productIndex = cart.productIndex
    } else {
      this.productIndex = 0
      this.products = []
      this.receipt = {
        budget: 0,
        subtotal: 0,
        change: 0
      }
    }

  }

  setProductIndex(productIndex) {
    this.productIndex = productIndex
  }

  setBudget(budget) {
    budget=parseFloat(budget)
    this.receipt.budget = budget;
    this.receipt.change = budget - this.receipt.subtotal;
  }

  addProduct(product) {
    this.products.push(product);
    this.receipt.subtotal += product.price;
    this.receipt.change = this.receipt.budget ? (this.receipt.budget - this.receipt.subtotal) : 0
  }

  removeProduct(key) {
    const product = this.products.splice(key, 1)[0]
    this.receipt.subtotal -= product.price;
    this.receipt.change = this.receipt.budget ? (this.receipt.budget + this.receipt.subtotal) : 0
  }
}