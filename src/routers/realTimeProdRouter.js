import { Router } from "express";

const realTimeProdRouter = Router();

realTimeProdRouter.get('/', (req, res) => {
res.render('realTimeProducts')
})

export default realTimeProdRouter;