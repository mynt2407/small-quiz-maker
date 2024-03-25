import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_LIST_QUESTION } from "./actionTypes";
import categoryApi from "../api/CategoryApi";
import { showErrorMessage, shuffleArray } from "../utils/MethodUtils";

const getListQuestionAction = createAsyncThunk(
    GET_LIST_QUESTION,
    async ({ categoryId, difficulty }, { rejectWithValue }) => {
        try {
            // get question from api
            const data = await categoryApi.getAllQuestions(categoryId, difficulty);
            // shuffle answers
            let questions = data.results.map(question => ({
                ...question,
                answers: shuffleArray([question.correct_answer, ...question.incorrect_answers])
            }));
            return questions;
        } catch (error) {
            return rejectWithValue("There is error when get list questions! Please try again!");
        }
    }
);

const questionSlide = createSlice({
    name: 'question',
    initialState: {
        questions: [],
        isLoading: false,
        choosedAnswers: []
    },
    reducers: {
        chooseAnswerAction: (state, { payload }) => {
            // remove old answer if exists
            const oldAnswerIndex = state.choosedAnswers.findIndex(item => item.question === payload.question);
          
            if (oldAnswerIndex > -1) {
                state.choosedAnswers.splice(oldAnswerIndex, 1);
            }
            // add new answer
            state.choosedAnswers.push({
                question: payload.question,
                answer: payload.answer
            });
        },
        resetQuestionAction: (state) => {
            state.questions = [];
            state.isLoading = false;
            state.choosedAnswers = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getListQuestionAction.pending, (state, action) => {
            state.isLoading = true;
            state.questions = [];
            state.choosedAnswers = [];
        });
        builder.addCase(getListQuestionAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.questions = action.payload;
        });
        builder.addCase(getListQuestionAction.rejected, (state, { payload }) => {
            state.isLoading = false;
            showErrorMessage(payload);
        });
    }
});

export const { actions, reducer } = questionSlide;
export const { chooseAnswerAction, resetQuestionAction } = questionSlide.actions;
export { getListQuestionAction };

export default questionSlide;