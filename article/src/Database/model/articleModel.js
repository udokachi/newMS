import mongoose from "mongoose";


const articleSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId, ref: "User"
  },
  title: {
    type: String,
    required: [true, 'title is required'],
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'content is required'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'description is required'],
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'category is required'],
    trim: true,
  },
  Keyword: {
    type: String,
    required: [true, 'Keyword is required'],
  },
  tags: {
    type: Array,
    required: [true, 'tags is required'],
  },
  scoring:[{
    userId: { type: String },
    rating: { type: Number },
  }],
  image: {
    type: String,
    required: [true, 'photo is required'],
  },
  reviews: [{
    comment: { type: String },
    userId: { type: String },
    reply: {
      comments: {
          type: String
      },
      user_id: {
          type: String,
          ref: "User"
      }
  }
  }],
  readingMinutes: {
    type: Number,
    required: [true, 'readingMinutes is required'],
  },
  date: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  timestamps: false
})

const Article = mongoose.model('Article', articleSchema)

export default Article


