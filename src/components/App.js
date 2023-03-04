import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  const displayAllQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((questions) => setQuestions(questions));
  };

  useEffect(displayAllQuestions, []);

  const handleNewQuestionClick = (question) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    })
      .then((resp) => resp.json())
      .then((newQuestion) => {
        setQuestions([...questions, newQuestion]);
        setPage("List");
      });
  };

  const deleteQuestion = (deletedQuestion) => {
    fetch(`http://localhost:4000/questions/${deletedQuestion.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then(() => {
        const deletedQuestions = questions.filter((question) => {
          return question.id !== deletedQuestion.id;
        });
        setQuestions(deletedQuestions);
      });
  };

  const handleAnswerUpdate = (updatedQuestion, newIndex) => {
    fetch(`http://localhost:4000/questions/${updatedQuestion.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newIndex,
      }),
    })
      .then((resp) => resp.json())
      .then((newQuestion) => {
        const updatedQuestions = questions.map((question) => {
          return question.id === newQuestion.id ? newQuestion : question;
        });
        setQuestions(updatedQuestions);
      });
  };

  return (
    <main>
      <AdminNavBar
        onChangePage={setPage}
        onhandleNewQuestionClick={handleNewQuestionClick}
      />
      {page === "Form" ? (
        <QuestionForm onHandleNewQuestionClick={handleNewQuestionClick} />
      ) : (
        <QuestionList
          onHandleAnswerUpdate={handleAnswerUpdate}
          onDeleteQuestion={deleteQuestion}
          questions={questions}
        />
      )}
    </main>
  );
}

export default App;
