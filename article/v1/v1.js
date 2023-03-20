

import { Router } from "express";
import articleRoutes from '../src/routes/articleRoutes.js'

const v1 = Router()

v1.use("/article", articleRoutes)


export default v1