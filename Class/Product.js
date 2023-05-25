export class Product {

    constructor(name, description, price, image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = 1;
        this.image = image;
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