import Api from './BaseApi';

class CategoryAPI {

    getAllCategories = () => {
        return Api.get("/api_category.php");
    };

    getAllQuestions = (categoryId, difficulty) => {
        return Api.get(`/api.php?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple`);
    };
}

const categoryApi = new CategoryAPI()
export default categoryApi;