import express from "express";
import { getPlans, purchasePlan } from "../controllers/creditController.js";
import { protect } from "../middlewares/auth.js";

const creditRouter = express.Router()

creditRouter.get('/plan', getPlans)
creditRouter.post('/purchase', protect, purchasePlan)

export default creditRouter