export class Product {

    constructor(name, description, price, quantity, image) {
        if (typeof name === 'string') {
            this.name = name;
            this.description = description;
            this.price = parseFloat(price);
            this.quantity = parseInt(quantity);
            this.image = image;
        }else{
            this.name = name.name;
            this.description = name.description;
            this.price = parseFloat(name.price);
            this.quantity = parseInt(name.quantity);
            this.image = name.image;
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
    }

    setQuantity(newQuantity) {
        this.quantity = newQuantity;
    }

    setImage(newImage) {
        this.image = newImage;
    }
}