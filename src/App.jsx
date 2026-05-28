import { useState, useCallback } from "react";
import IntroScreen from "./components/IntroScreen";
import QuestionScreen from "./components/QuestionScreen";
import LoadingScreen from "./components/LoadingScreen";
import ErrorScreen from "./components/ErrorScreen";
import ResultScreen from "./components/ResultScreen";
import { obterDiagnostico } from "./api";

const SCREENS = {
  INTRO: "intro",
  QUESTIONS: "questions",
  LOADING: "loading",
  ERROR: "error",
  RESULT: "result",
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.INTRO);
  const [diagnostico, setDiagnostico] = useState(null);
  const [error, setError] = useState("");
  const [lastRespostas, setLastRespostas] = useState(null);

  const handleStart = useCallback(() => {
    setScreen(SCREENS.QUESTIONS);
  }, []);

  const handleComplete = useCallback(async (respostas) => {
    setLastRespostas(respostas);
    setScreen(SCREENS.LOADING);
    try {
      const result = await obterDiagnostico(respostas);
      setDiagnostico(result);
      setScreen(SCREENS.RESULT);
    } catch (err) {
      setError(err.message || "Erro desconhecido ao processar o diagnóstico.");
      setScreen(SCREENS.ERROR);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (lastRespostas) {
      handleComplete(lastRespostas);
    } else {
      setScreen(SCREENS.QUESTIONS);
    }
  }, [lastRespostas, handleComplete]);

  const handleRestart = useCallback(() => {
    setDiagnostico(null);
    setError("");
    setLastRespostas(null);
    setScreen(SCREENS.INTRO);
  }, []);

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {screen === SCREENS.INTRO && <IntroScreen onStart={handleStart} />}
        {screen === SCREENS.QUESTIONS && (
          <QuestionScreen onComplete={handleComplete} />
        )}
        {screen === SCREENS.LOADING && <LoadingScreen />}
        {screen === SCREENS.ERROR && (
          <ErrorScreen message={error} onRetry={handleRetry} />
        )}
        {screen === SCREENS.RESULT && diagnostico && (
          <ResultScreen
            diagnostico={diagnostico}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
