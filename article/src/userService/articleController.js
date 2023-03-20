import Article from "../Database/model/articleModel.js";
import Review from "../Database/model/review.js";
import jwtPayload from 'jsonwebtoken';
import { convertToWords } from "../utils/utils.js";
import { v4 as uuidv4 } from "uuid";


export const createArticle = async (req, res) => {
    try {
        const id = req.user.id;
        // console.log(id)
        const { title,
            content,
            category,
            description,
            tags,
            rating,
            Keyword,
            readingMinutes } = req.body;

        const User = await UserAttribute.findOne({ _id: id })

        if (User) {
            const article = new Article({
                id,
                title,
                content,
                category,
                description,
                tags,
                image: req.file.path,
                rating,
                userId: User._id,
                Keyword,
                readingMinutes
            })

            await article.save()
            console.log(article)
            const words = convertToWords(readingMinutes);
            return res.status(201).json({
                message: 'article added successfully',
                readingMinutes: words
            });

        }

        return res.status(400).json({
            message: "Invalid User"
        })

    } catch (err) {
        console.log(">>>>>>>>>>>>>>>>>", err.description, err.stack, err.search)
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
};


export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({});
        return res.status(200).json({
            message: "Articles successfully retrieved",
            articles
        });
    } catch (error) {
        return res.status(400).json({
            message: "Articles retrieval failed",
            error,
            route: "/articles"
        });
    }
};

export const getSingleArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }
        return res.status(200).json({
            message: "Article successfully retrieved",
            article
        });
    } catch (error) {
        return res.status(400).json({
            message: "Article retrieval failed",
            error,
            route: "/articles/:id"
        });
    }
};
;

export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }
        return res.status(200).json({
            message: "Article successfully deleted",
            article
        });
    } catch (error) {
        return res.status(400).json({
            message: "Article deletion failed",
            error,
            route: "/articles/:id"
        });
    }
};


export const updateArticle = async (req, res) => {

    try {
        const id = req.user.id;

        console.log(id)
        console.log('Article ID:', req.params.id);


        const User = await UserAttribute.findOne({ _id: id })

        if (User) {
            const article = await Article.findById(req.params.id);

            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }

            // const { rating} = req.body
            const scoring = {
                userId: req.user._id,
                rating: req.body.rating,
            };
            console.log(scoring)
            article.scoring.push(scoring);
            await article.save();

            return res.status(201).json({
                 message: 'scoring added successfully',
                 scoring 
        });
        }

        return res.status(400).json({
            message: "user not found"
        })


    } catch (error) {

        console.log(">>>>>>>>>>>>>>>>>", error.description, error.stack, error.search)
        console.log(error);
        res.status(500).json({ message: 'Failed to add scoring' });
    }
};

export const addReview = async (req, res) => {

    try {
        const { comment, reply } = req.body
        const id = req.user.id;

        console.log('comment', comment)
        // console.log('Article ID:', req.params.id);


        const User = await UserAttribute.findOne({ _id: id })
        // console.log('user', User)
        if (User) {
            const article = await Article.findById(req.params.id);
            console.log('article', article)
            if (article) {
                const review = new Review({
                    id,
                    comment: comment,
                    reply

                })

                await review.save();
                const articleId = req.params.id
                // Add the review to the article's reviews array
                const updatedArticle = await Article.findByIdAndUpdate(
                    articleId,
                    { $push: { reviews: review } },
                    { new: true }
                );


                console.log(review)
                return res.status(201).json({
                    message: 'Review added successfully',
                    review,
                })

            }
            return res.status(404).json({ message: 'Article not found' });


        }

        return res.status(400).json({
            message: "user not found"
        })


    } catch (error) {
        console.log(">>>>>>>>>>>>>>>>>", error.description, error.stack, error.search)
        console.log(error);
        res.status(500).json({ message: 'Failed to add review' });
    }
};

export const searchArticles = (req, res, next) => {
    const keyword = req.query.q;

    // Use MongoDB Text Search to search for articles based on their content
    Article.find({ $text: { $search: keyword } })
        .exec()
        .then(docs => {
            const response = {
                articles: docs.map(doc => {
                    return {
                        title: doc.title,
                        content: doc.content,
                        category: doc.category,
                        image: doc.image,
                        tags: doc.tags,
                        readingMinutes: doc.readingMinutes,
                        statusCode: 200
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


export default createArticle


