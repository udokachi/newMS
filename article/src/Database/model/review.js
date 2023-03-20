import mongoose from "mongoose";


const reviewSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId, ref: "Article"
      },
    comment: {
        type: String,
        required: true
    },
    article_id: {
        type: String,
        ref: "Article",
        
    },
    user_id: {
        type: String,
        ref: "User",
        
    },
    reply: {
        comments: {
            type: String
        },
        user_id: {
            type: String,
            ref: "User"
        }
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
