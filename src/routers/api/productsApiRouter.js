import { Router } from 'express';
import ProductsManager from '../../dao/productManager.js';

const router = Router();

router.get('/products', async (req, res) =>{
    const { query = {} } = req;
    const products = await ProductsManager.getProducts(query);
    res.status(200).json(products);
});

router.get('/products/:pid', async (req, res) => {
    try {
        const { params: { pid } } = req;
        const product = await ProductsManager.getProductById(pid);
        res.status(200).json(product);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message});
    }
});

router.post('/products', async (req, res) =>{
    const { body } = req;
    const newProduct = await ProductsManager.createProduct(body);
    res.status(201).json(newProduct);
});

router.put('/products/:pid', async (req, res) =>{
    try {
        const { params: { pid }, body} = req;
        await ProductsManager.updateProduct(pid, body);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message});
    }
});

router.delete('/products/:pid', async (req, res) => {
    try {
        const { params: { pid } } = req;
        await ProductsManager.deleteProduct(pid);
        res.status(204).end();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message});
    }
});

export default router;