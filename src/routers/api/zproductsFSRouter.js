import { Router } from 'express';
import ProductsFSManager from '../dao/productFSManager.js';

const productsRouter = Router();

const productFSManager = new ProductsFSManager('src/products.json');

productsRouter.get('/products', async (req, res) => {
    let products = await productFSManager.getProduct();
    const limit = req.query.limit;
    if (limit){
        res.status(200).json(products.slice(0, limit));
    }else{
        res.status(200).json(products);
    }
});

productsRouter.get('/products/:pid', async (req, res) =>{
    let pid = req.params.pid;
    try {
        let product = await productFSManager.getProductById(pid);
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

productsRouter.post('/products', async (req, res) =>{
    let product = req.body
    try {
        await productFSManager.createProduct(product)
        res.status(201).json({message:'Producto creado correctamente'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

productsRouter.put('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    try {
        await productFSManager.updateProduct(pid, updatedProduct);
        res.status(200).json({ message: 'El producto fue actualizado con éxito'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

productsRouter.delete('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        await productFSManager.deleteProduct(pid);
        res.status(200).json({ message: 'El producto fue eliminado con éxito'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default productsRouter;