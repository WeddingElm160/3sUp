import Product from './Product'
export class Cart {
  receipt; products; productIndex; storeName; temporalProduct;
  constructor(cart) {
    if (typeof cart !== 'string') {
      this.receipt = {
        budget: parseFloat(cart.receipt.budget),
        subtotal: parseFloat(cart.receipt.subtotal),
        change: parseFloat(cart.receipt.change)
      } 
      this.products = cart.products.map(product => new Product(product))
      this.productIndex = cart.productIndex
      this.storeName = cart.storeName
    } else {
      this.storeName = cart
      this.productIndex = 0
      this.products = []
      this.receipt = {
        budget: 0,
        subtotal: 0,
        change: 0
      }
    }
    this.temporalProduct = {}
  }

  setTemporalProduct(temporalProduct){
    this.temporalProduct = temporalProduct;
  }

  setProductIndex(productIndex) {
    this.productIndex = productIndex
  }

  setBudget(budget) {
    budget=parseFloat(budget)
    this.receipt.budget = budget;
    this.receipt.change = budget - this.receipt.subtotal;
  }

  updateSubtotal(amount) {
    const amountFloat=parseFloat(amount);
    this.receipt.subtotal+=amountFloat;
    this.receipt.change-=amountFloat;

  }

  addProduct(product) {
    product.added = true;
    this.products.push(product);
    this.receipt.subtotal += product.price*product.quantity;
    this.receipt.change = this.receipt.budget ? (this.receipt.budget - this.receipt.subtotal) : 0
  }

  removeProduct(key) {
    if (typeof key == 'string')
      key = this.products.findIndex(product => product.barcode == key)
    const product = this.products.splice(key, 1)[0]
    this.receipt.subtotal -= product.price*product.quantity;
    this.receipt.change = this.receipt.budget ? (this.receipt.budget + this.receipt.subtotal) : 0
  }

  productIsAdded(barcode){
    const index = this.products.findIndex(product => product.barcode == barcode)
    if(index >= 0){
      this.temporalProduct = this.products[index];
      return true
    }else
      return false
  }
}