import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import indexRouter from './routers/views/indexRouter.js';
import cartApiRouter from './routers/api/cartsApiRouter.js';
import productsApiRouter from './routers/api/productsApiRouter.js';
import realTimeProdRouter from './routers/views/realTimeProdRouter.js';
import chatViewsRouter from './routers/views/chatViewsRouter.js';
import { __dirname } from './utilities.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use('/', indexRouter, realTimeProdRouter, chatViewsRouter);
app.use('/api', productsApiRouter, cartApiRouter);

app.use((error, req, res, next) =>{
    const message = `Ups! Ha ocurrido un error: ${error.message}, lo sentimos`;
    console.log(message);
    res.status(500).join({ status: 'error', message})
})

export default app