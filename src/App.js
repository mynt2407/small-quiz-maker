import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import QuizMakerPage from "./QuizMaker";
import QuizResultPage from "./QuizResult";

const App = () => {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={<QuizMakerPage />}
        ></Route>
        <Route
          path="/results"
          element={<QuizResultPage />}
        ></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
