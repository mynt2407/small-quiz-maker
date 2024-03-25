import React from "react";
import { Button } from "react-bootstrap";

const QuestionForm = ({ questions, choosedAnswers, onChooseAnswer, onSubmit }) => {

    return (
        <>
            {
                questions.map((question, index) =>
                    <QuestionItem
                        key={index}
                        question={question.question}
                        answers={question.answers}
                        choosedAnswer={choosedAnswers.find(item => item.question === question.question)?.answer}
                        onChooseAnswer={onChooseAnswer}
                    />
                )
            }
            {
                (questions.length !== 0 && questions.length === choosedAnswers.length) &&
                <div className="mt-3 d-grid gap-2">
                    <Button onClick={onSubmit}>
                        Submit
                    </Button>
                </div>
            }
        </>
    );
};

const QuestionItem = ({ question, answers, choosedAnswer, onChooseAnswer }) => {
    return (
        <>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            {
                answers.map((answer, index) =>
                    <Button
                        key={index}
                        className="me-2 mb-4"
                        variant={
                            (choosedAnswer !== undefined && choosedAnswer === answer)
                                ? "success" // choosed
                                : "outline-success" // not choosed
                        }
                        onClick={() => onChooseAnswer({ question, answer })}
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </Button>
                )
            }
        </>
    );
}

export default QuestionForm;