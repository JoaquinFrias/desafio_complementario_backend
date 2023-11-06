import { Router } from 'express';
import CartsFSManager from '../../dao/zcartFSManager.js';

const cartsFSRouter = Router();

const cartFSManager = new CartsFSManager('src/carts.json');

cartsFSRouter.get('/carts', async (req, res) => {
    let carts = await cartFSManager.getCarts();
    res.status(200).json(carts)
})

cartsFSRouter.post('/carts', async (req, res) =>{
    let cart = req.body
    try {
        await cartFSManager.createCart(cart)
        res.status(201).json({message:'Carrito creado exitosamente'});
    } catch (error) {
        res.status(400).send({ status: "error", message: "Lo sentimos, carrito no creado. Intentelo de nuevo mas tarde" });
    }
});

cartsFSRouter.get('/carts/:cid', async (req, res) => {
    let cid = req.params.cid
    let carts = await cartFSManager.getProductsOfCart(cid);
    res.status(200).json(carts)
})

cartsFSRouter.post('/carts/:cid/product/:pid', async (req, res) =>{
    let cid = req.params.cid
    let pid = req.params.pid
    try {
        await cartFSManager.addProductsToCart(cid, pid)
        res.status(201).json({message:'Producto agregado con éxito'});
    } catch (error) {
        res.status(400).send({ status: "error", message: "Lo sentimos, no pudimos agregar el producto al carrito" });
    }
});

export default cartsFSRouter;