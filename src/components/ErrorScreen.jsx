export default function ErrorScreen({ message, onRetry }) {
  return (
    <div className="error-screen">
      <div className="error__icon">⚠</div>
      <h2 className="error__title">Erro no diagnóstico</h2>
      <p className="error__message">{message}</p>
      <button
        id="btn-retry"
        className="btn btn--primary"
        onClick={onRetry}
      >
        Tentar novamente
      </button>
    </div>
  );
}
