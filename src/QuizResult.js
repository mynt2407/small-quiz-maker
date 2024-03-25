import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { selectListQuestions, selectListChoosedAnswers } from "./redux/QuestionSelector"
import { Container } from "react-bootstrap";
import ResultForm, { CreateANewQuizItem } from "./components/ResultForm";

const QuizResultPage = ({ questions, choosedAnswers }) => {

  const navigate = useNavigate();

  const getRightAnswerCount = () => {
    let count = 0;
    for (const choosedAnswer of choosedAnswers) {
      if (questions.find(item => item.question === choosedAnswer.question).correct_answer === choosedAnswer.answer) {
        count++;
      }
    }
    return count;
  }

  const redirectToQuizMakerPage = () => {
    navigate("/");
  };

  if (choosedAnswers.length === 0) {
    return (
      <>
        <p className="text-center">You haven't been take a quiz</p>
        <CreateANewQuizItem onCreateNewQuiz={redirectToQuizMakerPage} />
      </>
    )
  }

  return (
    <>
      <Container fluid className="p-0">
        <h2 className="text-center">RESULTS</h2>
        <div className="mt-3 d-flex justify-content-center">
          <div>
            <ResultForm
              questions={questions}
              choosedAnswers={choosedAnswers}
              rightAnswerCount={getRightAnswerCount()}
              onCreateNewQuiz={redirectToQuizMakerPage}
            />
          </div>
        </div>
      </Container>
    </>
  )
};

export default connect(
  state => {
    return {
      questions: selectListQuestions(state),
      choosedAnswers: selectListChoosedAnswers(state)
    };
  }
)(QuizResultPage);