import React from "react";
import { Button } from "react-bootstrap";

const ResultForm = ({ questions, choosedAnswers, rightAnswerCount, onCreateNewQuiz }) => {

    const getColorOfScore = () => {
        if (rightAnswerCount <= 1) {
            return "bg-danger";
        }

        if (rightAnswerCount === 2 || rightAnswerCount === 3) {
            return "bg-warning";
        }

        if (rightAnswerCount === 4 || rightAnswerCount === 5) {
            return "bg-success";
        }
    }

    return (
        <>
            {
                questions.map((question, index) =>
                    <QuestionItem
                        key={index}
                        question={question.question}
                        answers={question.answers}
                        choosedAnswer={choosedAnswers.find(item => item.question === question.question).answer}
                        correctAnswer={question.correct_answer}
                    />
                )
            }
            <p className={`text-center ${getColorOfScore()}`}>
                You scored {rightAnswerCount} out of {questions.length}
            </p>
            <CreateANewQuizItem onCreateNewQuiz={onCreateNewQuiz} />
        </>
    );
};

const QuestionItem = ({ question, answers, choosedAnswer, correctAnswer }) => {

    const getColorOfAnswer = (answer) => {
        if (answer === correctAnswer) {
            // right answer
            return "success";
        }

        if (answer === choosedAnswer) {
            // wrong answer
            return "danger";
        }

        return "outline-success";
    }

    return (
        <>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            {
                answers.map((answer, index) =>
                    <Button
                        key={index}
                        className="me-2 mb-4"
                        variant={getColorOfAnswer(answer)}
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </Button>
                )
            }
        </>
    );
}

export const CreateANewQuizItem = ({ onCreateNewQuiz }) => {
    return (
        <div className="mt-3 d-grid gap-2">
            <Button onClick={onCreateNewQuiz}>
                Create a new quiz
            </Button>
        </div>
    );
}

export default ResultForm;