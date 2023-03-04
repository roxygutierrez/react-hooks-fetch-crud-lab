import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteQuestion, onHandleAnswerUpdate }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions
          ? questions.map((question, index) => {
              return (
                <QuestionItem
                  key={index}
                  question={question}
                  onDeleteQuestion={onDeleteQuestion}
                  onHandleAnswerUpdate={onHandleAnswerUpdate}
                />
              );
            })
          : ""}
      </ul>
    </section>
  );
}

export default QuestionList;
