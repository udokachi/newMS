

class ArticleRepository {
    constructor(articleModel) {
      this.articleModel = articleModel;
    }
  
    async create(articleData) {
      const article = new this.articleModel(articleData);
      await article.save();
      return article;
    }
  
    async getById(id) {
      const article = await this.articleModel.findById(id);
      return article;
    }
  
    async getAll() {
      const articles = await this.articleModel.find({});
      return articles;
    }
  
    async update(id, articleData) {
      const article = await this.articleModel.findByIdAndUpdate(id, articleData, { new: true });
      return article;
    }

    async delete(id) {
        const article = await this.articleModel.findByIdAndDelete(id);
        return article;
      }
    
      async search(query) {
        const articles = await this.articleModel.find({ $text: { $search: query } });
        return articles;
      }
    
    

    async addReview(articleId, comment, reply) {
        
          const article = await Article.findById(articleId);
         return article
        
        }
    }
   
  module.exports = ArticleRepository;
  