import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { resetQuestionAction, getListQuestionAction, chooseAnswerAction } from "./redux/QuestionSlide"
import { selectLoading, selectListQuestions, selectListChoosedAnswers } from "./redux/QuestionSelector"
import { Container } from "react-bootstrap";
import CategoryApi from "./api/CategoryApi";
import QuizForm from "./components/QuizForm";
import QuestionForm from "./components/QuestionForm";

const QuizMakerPage = ({
  isQuestionLoading, questions, choosedAnswers,
  resetQuestionAction, getListQuestionAction, chooseAnswerAction
}) => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const data = await CategoryApi.getAllCategories();
      setCategories(data.trivia_categories);
    }
    resetQuestionAction();
    getAllCategories();
  }, [resetQuestionAction]);

  const redirectToQuizResultPage = useCallback(() => {
    navigate("/results");
  }, [navigate]);

  return (
    <>
      <Container fluid className="p-0">
        <h2 className="text-center">QUIZ MAKER</h2>
        <div className="mt-3">
          <QuizForm
            categories={categories}
            isSubmitting={isQuestionLoading}
            onSubmit={getListQuestionAction}
          />
        </div>
        {questions.length !== 0 &&
          <div className="mt-3 d-flex justify-content-center">
            <div>
              <QuestionForm
                questions={questions}
                choosedAnswers={choosedAnswers}
                onChooseAnswer={chooseAnswerAction}
                onSubmit={redirectToQuizResultPage}
              />
            </div>
          </div>
        }
      </Container>
    </>
  )
};

export default connect(
  state => {
    return {
      isQuestionLoading: selectLoading(state),
      questions: selectListQuestions(state),
      choosedAnswers: selectListChoosedAnswers(state)
    };
  },
  { resetQuestionAction, getListQuestionAction, chooseAnswerAction }
)(QuizMakerPage);