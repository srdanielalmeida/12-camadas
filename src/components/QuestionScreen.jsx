import { useState } from "react";
import { PERGUNTAS } from "../data";

const MIN_CHARS = 20;

export default function QuestionScreen({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [respostas, setRespostas] = useState(Array(PERGUNTAS.length).fill(""));

  const currentAnswer = respostas[currentIndex];
  const isValid = currentAnswer.trim().length >= MIN_CHARS;
  const isLast = currentIndex === PERGUNTAS.length - 1;

  function handleChange(e) {
    const updated = [...respostas];
    updated[currentIndex] = e.target.value;
    setRespostas(updated);
  }

  function handleNext() {
    if (!isValid) return;
    if (isLast) {
      onComplete(respostas);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && e.ctrlKey && isValid) {
      handleNext();
    }
  }

  return (
    <div className="question-screen" key={currentIndex}>
      {/* Progress */}
      <div className="question__progress">
        {PERGUNTAS.map((_, i) => (
          <div
            key={i}
            className={`question__progress-dot ${
              i < currentIndex
                ? "question__progress-dot--filled"
                : i === currentIndex
                ? "question__progress-dot--active"
                : ""
            }`}
          />
        ))}
      </div>

      {/* Number */}
      <p className="question__number">
        Pergunta {currentIndex + 1} de {PERGUNTAS.length}
      </p>

      {/* Question text */}
      <p className="question__text">{PERGUNTAS[currentIndex]}</p>

      {/* Textarea */}
      <textarea
        id={`question-input-${currentIndex}`}
        className="question__textarea"
        value={currentAnswer}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Escreva sua resposta aqui..."
        autoFocus
      />

      {/* Character count */}
      <p
        className={`question__char-count ${
          isValid ? "question__char-count--valid" : ""
        }`}
      >
        {currentAnswer.trim().length} / {MIN_CHARS} caracteres mínimos
        {isValid && " ✓"}
      </p>

      {/* Actions */}
      <div
        className={`question__actions ${
          currentIndex === 0 ? "question__actions--single" : ""
        }`}
      >
        {currentIndex > 0 && (
          <button
            id="btn-back"
            className="btn btn--ghost btn--small"
            onClick={handleBack}
          >
            ← Anterior
          </button>
        )}
        <button
          id="btn-next"
          className="btn btn--primary"
          disabled={!isValid}
          onClick={handleNext}
        >
          {isLast ? "Obter diagnóstico" : "Próxima →"}
        </button>
      </div>
    </div>
  );
}
