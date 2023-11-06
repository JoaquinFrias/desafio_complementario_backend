import ProductModel from "../models/productModel.js";
import { Exception } from "../utilities.js";

export default class ProductsManager {
    static getProducts(query = {}) {
        return ProductModel.find(query)
    }

    static async getProductById (pid){
        const product = await ProductModel.findById(pid);
        if (!product){
            throw new Exception(`NOT FOUND: Producto con ID: ${pid} no encontrado`, 404);
        }
        return product
    }

    static async createProduct(product){
        const { title, description, code, price, status, stock, category, thumbnail} = product;

        try {
            const newProduct = new ProductModel({ title, description, code, price, status, stock, category, thumbnail });
            const createdProduct = await newProduct.save();
            console.log('Producto creado con éxito');
            return createdProduct;
        } catch (error) {
            throw new Exception(`Error al crear el producto: ${error.message}`, 500);
        }
    }

    static async updateProduct(pid, data) {
        try {
            const updatedProduct = await ProductModel.updateOne({ _id: pid }, data);
            if (updatedProduct.modifiedCount === 0) {
                throw new Exception(`NOT FOUND: Producto con ID: ${pid} no encontrado`, 404);
            }
            return console.log('Producto actualizado con éxito');
        } catch (error) {
            throw new Exception(`Error al actualizar el producto: ${error.message}`, 500);
        }
    }

    static async deleteProduct(pid) {
        try {
            const deletedProduct = await ProductModel.deleteOne({ _id: pid });

            if (deletedProduct.deletedCount === 0) {
                throw new Exception(`NOT FOUND: Producto con ID: ${pid} no encontrado`, 404);
            }
            return console.log('Producto eliminado con éxito');
        } catch (error) {
            throw new Exception(`Error al actualizar el producto: ${error.message}`, 500);
        }
    }
}