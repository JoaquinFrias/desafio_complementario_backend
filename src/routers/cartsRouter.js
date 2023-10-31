import { Router } from 'express';
import CartsManager from '../data/cartManager.js';

const cartsRouter = Router();

const cartManager = new CartsManager('src/carts.json');

cartsRouter.get('/carts', async (req, res) => {
    let carts = await cartManager.getCarts();
    res.status(200).json(carts)
})

cartsRouter.post('/carts', async (req, res) =>{
    let cart = req.body
    try {
        await cartManager.createCart(cart)
        res.status(201).json({message:'Carrito creado exitosamente'});
    } catch (error) {
        res.status(400).send({ status: "error", message: "Lo sentimos, carrito no creado. Intentelo de nuevo mas tarde" });
    }
});

cartsRouter.get('/carts/:cid', async (req, res) => {
    let cid = req.params.cid
    let carts = await cartManager.getProductsOfCart(cid);
    res.status(200).json(carts)
})

cartsRouter.post('/carts/:cid/product/:pid', async (req, res) =>{
    let cid = req.params.cid
    let pid = req.params.pid
    try {
        await cartManager.addProductsToCart(cid, pid)
        res.status(201).json({message:'Producto agregado con éxito'});
    } catch (error) {
        res.status(400).send({ status: "error", message: "Lo sentimos, no pudimos agregar el producto al carrito" });
    }
});

export default cartsRouter;