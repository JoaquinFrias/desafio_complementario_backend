import { getJSONFromFile, saveJSONToFile, generateID } from "../utilities.js";

class CartsFSManager {
    constructor(path) {
    this.path = path;
    }

    getCarts() {
    return getJSONFromFile(this.path);
    }

    async createCart(cart) {
    const { products } = cart;

    const carts = await getJSONFromFile(this.path);
    const id = generateID();

    const newCart = {
        id,
        products,
    };
    carts.push(newCart);

    return saveJSONToFile(this.path, carts);
    }

    async getProductsOfCart(id) {
    const carts = await getJSONFromFile(this.path);
    const cart = carts.find((cart) => cart.id === id);
    if (!cart) {
        throw new Error(`El producto con ID: ${id} no existe`);
    }
    return cart;
    }

    async addProductsToCart(cid, pid) {
    const carts = await getJSONFromFile(this.path);
    const cartIndex = carts.findIndex((cart) => cart.id === cid);

    if (cartIndex === -1) {
        throw new Error(`No encontramos el carrito con ID: ${cid}`);
    }

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(
        (product) => product.product === pid
    );

    if (productIndex === -1) {
        cart.products.push({ product: pid, quantity: 1 });
    } else {
        cart.products[productIndex].quantity++;
    }

    await saveJSONToFile(this.path, carts);
    }
}

export default CartsFSManager;
