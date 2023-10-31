import { Router } from 'express';
import ProductsManager from '../data/productManager.js';



const productsRouter = Router();

const productManager = new ProductsManager('src/products.json');

productsRouter.get('/products', async (req, res) => {
    let products = await productManager.getProduct();
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
        let product = await productManager.getProductById(pid);
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

productsRouter.post('/products', async (req, res) =>{
    let product = req.body
    try {
        await productManager.createProduct(product)
        res.status(201).json({message:'Producto creado correctamente'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

productsRouter.put('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const updatedProduct = req.body;
    try {
        await productManager.updateProduct(pid, updatedProduct);
        res.status(200).json({ message: 'El producto fue actualizado con éxito'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

productsRouter.delete('/products/:pid', async (req, res) => {
    const pid = req.params.pid;
    try {
        await productManager.deleteProduct(pid);
        res.status(200).json({ message: 'El producto fue eliminado con éxito'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default productsRouter;