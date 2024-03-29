import Product from './Product'
export class Cart {
  receipt; products; storeName; temporalProduct; removeTemporalProduct; warning;
  constructor(cart) {
    if (typeof cart !== 'string') {
      this.receipt = {
        budget: parseFloat(cart.receipt.budget),
        subtotal: parseFloat(cart.receipt.subtotal),
        change: parseFloat(cart.receipt.change)
      } 
      this.products = cart.products.map(product => new Product(product))
      this.storeName = cart.storeName
      this.warning = cart.warning
    } else {
      this.storeName = cart
      this.products = []
      this.receipt = {
        budget: 0,
        subtotal: 0,
        change: 0
      }
      this.warning = false
    }
    this.temporalProduct = {}
  }

  setRemoveTemporalProduct(index){
    this.removeTemporalProduct = ()=>this.removeProduct(index)
  }

  setTemporalProduct(temporalProduct){
    this.temporalProduct = temporalProduct;
  }

  setWarning(value){
    this.warning = value;
  }

  setBudget(budget) {
    budget=parseFloat(budget)
    this.receipt.budget = budget;
    this.receipt.change = budget - this.receipt.subtotal;
    this.setWarning(budget&&this.receipt.change<0);
  }

  updateSubtotal(amount) {
    const amountFloat=parseFloat(amount);
    this.receipt.subtotal+=amountFloat;
    this.receipt.change-=amountFloat;
    this.setWarning(this.receipt.budget&&this.receipt.change<0);
  }

  removeAllProducts(){
    this.temporalProduct = {}
    this.products = []
    this.receipt.subtotal = 0;
    this.receipt.change = this.receipt.budget;
    this.setWarning(false);
  }

  addProduct(product) {
    product.added = true;
    this.products.push(product);
    this.receipt.subtotal += product.price*product.quantity;
    this.receipt.change = this.receipt.budget ? (this.receipt.budget - this.receipt.subtotal) : 0
    this.setWarning(this.receipt.budget&&this.receipt.change<0);
  }

  removeProductList(list){
    list.sort((a, b) => b - a);
    for (let i = 0; i < list.length; i++) {
      const product = this.products.splice(list[i], 1)[0];
      this.receipt.subtotal -= product.price*product.quantity;
    }
    this.receipt.change = this.receipt.budget ? (this.receipt.budget - this.receipt.subtotal) : 0
    this.setWarning(this.receipt.budget&&this.receipt.change<0);
  }

  removeProduct(key) {
    const product = this.products.splice(key, 1)[0]
    this.receipt.subtotal -= product.price*product.quantity;
    this.receipt.change = this.receipt.budget ? (this.receipt.budget - this.receipt.subtotal) : 0
    this.setWarning(this.receipt.budget&&this.receipt.change<0);
  }

  productIsAdded(barcode){
    const index = this.products.findIndex(product => product.barcode == barcode)
    if(index >= 0){
      this.temporalProduct = this.products[index];
      this.setRemoveTemporalProduct(index);
      return true
    }else
      return false
  }
}