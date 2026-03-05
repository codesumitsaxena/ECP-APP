import { useState } from "react";
import LearnHome from "../screens/Learn/LearnScreen.jsx";
import LessonDetail from "../screens/Learn/Lessondetail.jsx";
import LessonContent from "../screens/Learn/Lessoncontent.jsx";
import InteractiveDiagram from "../screens/Learn/Interactivediagram.jsx";
import QuizScreen from "../screens/Learn/Quizscreen.jsx";
import QuizResult from "./Learn/Quizresult.jsx";

export default function LearnScreen() {
  const [screen, setScreen] = useState("learn");
  const [quizAns, setQuizAns] = useState([]);

  const navigate = (to, data) => {
    setScreen(to);
    if (data) setQuizAns(data);
  };

  return (
    <>
      {screen === "learn"              && <LearnHome          navigate={navigate} />}
      {screen === "lessonDetail"       && <LessonDetail       navigate={navigate} />}
      {screen === "lessonContent"      && <LessonContent      navigate={navigate} />}
      {screen === "interactiveDiagram" && <InteractiveDiagram navigate={navigate} />}
      {screen === "quiz"               && <QuizScreen         navigate={navigate} />}
      {screen === "quizResult"         && <QuizResult         navigate={navigate} answers={quizAns} />}
    </>
  );
}