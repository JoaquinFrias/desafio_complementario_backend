import { Router } from "express";

const realTimeProdRouter = Router();

realTimeProdRouter.get('/realtimeproducts', (req, res) => {
res.render('realTimeProducts')
})

export default realTimeProdRouter;