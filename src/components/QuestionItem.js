import React from "react";

function QuestionItem({ question, onDeleteQuestion, onHandleAnswerUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleQuestionDelete = () => {
    onDeleteQuestion(question);
  };

  const handleDropDown = (e) => {
    const newIndex = e.target.value;
    onHandleAnswerUpdate(question, newIndex);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleDropDown}>
          {options}
        </select>
      </label>
      <button onClick={handleQuestionDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
