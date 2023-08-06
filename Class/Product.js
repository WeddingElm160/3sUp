export class Product {

    constructor(name, description, price, quantity, image) {
        if (typeof name === 'string') {
            this.name = name;
            this.description = description;
            this.price = parseFloat(price);
            this.quantity = parseInt(quantity);
            this.image = image;
            //this.totalPrice = price;
            this.added = false;
        }else{
            this.name = name.name;
            this.description = name.description;
            this.price = parseFloat(name.price);
            this.quantity = parseInt(name.quantity);
            this.image = name.image;
            //this.totalPrice = this.quantity * this.quantity;
            this.added = true;
        }
        
    }

    setName(newName) {
        this.name = newName;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }

    setPrice(newPrice) {
        this.price = newPrice;
        //this.totalPrice = this.quantity * this.price
    }

    setQuantity(newQuantity) {
        this.quantity = newQuantity;
    }

    setImage(newImage) {
        this.image = newImage;
    }
}