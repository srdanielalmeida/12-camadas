export default function ResultScreen({ diagnostico, onRestart }) {
  const tipoNorm = diagnostico.tipo?.toLowerCase() || "";
  const isIntegrativa = tipoNorm.includes("integrativa");

  return (
    <div className="result">
      {/* Header */}
      <header className="result__header">
        <p className="result__camada-label">Camada identificada</p>
        <h1 className="result__camada-name">
          {diagnostico.camada_identificada}
        </h1>
        <span
          className={`result__badge ${
            isIntegrativa
              ? "result__badge--integrativa"
              : "result__badge--divisiva"
          }`}
        >
          {diagnostico.tipo}
        </span>
      </header>

      {/* Diagnóstico Clínico */}
      <section className="result__section">
        <h2 className="result__section-title">Diagnóstico</h2>
        <p className="result__diagnostico">
          {diagnostico.diagnostico_clinico}
        </p>
      </section>

      {/* Vício e Virtude */}
      <div className="result__dual">
        <div className="result__dual-card result__dual-card--vicio">
          <h3 className="result__dual-label">O Vício</h3>
          <p className="result__dual-text">{diagnostico.o_vicio}</p>
        </div>
        <div className="result__dual-card result__dual-card--virtude">
          <h3 className="result__dual-label">A Virtude</h3>
          <p className="result__dual-text">{diagnostico.a_virtude}</p>
        </div>
      </div>

      {/* Reflexão Final */}
      <div className="result__reflexao">
        <p className="result__reflexao-label">Reflexão final</p>
        <p className="result__reflexao-text">
          &ldquo;{diagnostico.reflexao_final}&rdquo;
        </p>
      </div>

      {/* Restart */}
      <div className="result__restart">
        <button
          id="btn-restart"
          className="btn btn--ghost"
          onClick={onRestart}
        >
          Refazer diagnóstico
        </button>
      </div>
    </div>
  );
}
