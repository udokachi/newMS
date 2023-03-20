import express from "express";
import createArticle,{
  getArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
  searchArticles,
  addReview

} from  "../service/articleService.js";
import {auth} from '../middlewares/auth.js';
import { upload } from "../utils/multer.js";

const articleRoutes = express.Router();

articleRoutes.post("/articles", auth, upload.single('image'), createArticle);
articleRoutes.get("/articles", getArticles);
articleRoutes.get("/articles/:id", getSingleArticle);
articleRoutes.get("/articles/search", searchArticles);
articleRoutes.put("/articles/:id", auth, updateArticle);
articleRoutes.delete("/articles/:id", deleteArticle);
articleRoutes.post("/articles/review/:id", auth, addReview);

export default articleRoutes;
