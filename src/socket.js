import { Server } from 'socket.io';
import ProductsManager from './data/productManager.js';

let io;
const productManager = new ProductsManager('src/products.json');

export const init = (httpServer) => {
    io = new Server(httpServer);

    io.on('connection', async (socketClient)=>{
        console.log(`Se ha conectado un nuevo cliente con id ${socketClient.id}`);
        let products = await productManager.getProduct();
        
        socketClient.emit('listProducts',  products)

        socketClient.on('addProduct', async (newProduct)=>{
            await productManager.createProduct(newProduct);
            let products = await productManager.getProduct();
            io.emit('listProducts', products)
        })
        
        socketClient.on('deleteProduct', async (pid)=>{
            await productManager.deleteProduct(pid);
            let products = await productManager.getProduct();
            io.emit('listProducts', products)
        })

        socketClient.on('disconnect', () =>{
            console.log(`Se ha desconectado el cliente con id ${socketClient.id}`);
        })
    })

    console.log('Server socket running ✔️');
};