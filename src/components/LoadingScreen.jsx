export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading__orb-container">
        <div className="loading__orb" />
        <div className="loading__orb" />
        <div className="loading__orb" />
        <div className="loading__core" />
      </div>
      <p className="loading__text">Analisando suas respostas…</p>
      <p className="loading__subtext">
        Cruzando com os critérios das doze camadas
      </p>
    </div>
  );
}
