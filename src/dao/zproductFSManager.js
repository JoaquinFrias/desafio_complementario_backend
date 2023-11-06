import { getJSONFromFile, saveJSONToFile, generateID } from '../utilities.js';

class ProductsFSManager {
    constructor(path) {
    this.path = path;
}

async createProduct(product) {
    const { title, description, code, price, status, stock, category, thumbnail} = product;

    const productStatus = status !== undefined ? status : true;

    const productThumbnail = thumbnail !== undefined ? thumbnail : [];

    if (!title || !description || !code || !price || !stock || !category ){
        throw new Error ('Por favor, complete todos los campos.')
    }
    const products = await getJSONFromFile(this.path);
    const id = generateID();

    const newProduct = { 
        id,
        title,
        description,
        code,
        price,
        status:productStatus,
        stock,
        category,
        thumbnail:productThumbnail
    };
    products.push(newProduct);
    
    return saveJSONToFile(this.path, products)
}

getProduct() {    
    return getJSONFromFile(this.path);
}

async getProductById(id) {
    const products = await getJSONFromFile(this.path);
    const product = products.find((product) => product.id === id);
    if (!product) {
        throw new Error(`No se encontró un producto con el ID ${id}`);
    }
    return product;
}

async updateProduct(id, updatedProduct) {
    const products = await getJSONFromFile(this.path);
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        throw new Error(`No se encontró el producto con el ID ${id}`);
    }

    products[index] = { id, ...updatedProduct };

    await saveJSONToFile(this.path, products);
}

async deleteProduct(id) {
    const products = await getJSONFromFile(this.path);
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        throw new Error(`Producto con ID ${id} no encontrado`);
    }

    products.splice(index, 1);

    await saveJSONToFile(this.path, products);
}
}

export default ProductsFSManager;