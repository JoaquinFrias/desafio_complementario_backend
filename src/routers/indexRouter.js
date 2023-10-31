import { Router } from 'express';

const indexRouter = Router();

indexRouter.get ('/', (req, res) => {
    const user ={
        name: 'Juanito'
    }
    res.render('home', user)
})


export default indexRouter