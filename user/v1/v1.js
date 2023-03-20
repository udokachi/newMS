
import { Router } from "express";
import userRoutes from "../src/routes/userRoutes.js";
const v1 = Router()

v1.use("/user", userRoutes)

export default v1