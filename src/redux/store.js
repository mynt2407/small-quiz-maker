import { configureStore } from "@reduxjs/toolkit";
import questionSlide from "./QuestionSlide";

const store = configureStore({
    reducer: {
        question: questionSlide.reducer,
    }
});
export default store;