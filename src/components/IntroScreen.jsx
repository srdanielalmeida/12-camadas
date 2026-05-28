export default function IntroScreen({ onStart }) {
  return (
    <div className="intro">
      <p className="intro__roman">XII</p>
      <h1 className="intro__title">As Doze Camadas da Personalidade</h1>
      <div className="intro__divider" />
      <p className="intro__subtitle">
        Um diagnóstico filosófico baseado no referencial teórico de
        Olavo de Carvalho. Sem autoajuda. Sem consolação. Apenas um laudo.
      </p>
      <div className="intro__disclaimer">
        Este questionário contém cinco perguntas discursivas. Suas respostas serão
        analisadas por inteligência artificial segundo os critérios do texto
        &ldquo;As Doze Camadas da Personalidade Humana&rdquo;. O resultado não
        substitui acompanhamento profissional — é um exercício de autoconsciência.
        Responda com honestidade; a qualidade do diagnóstico depende da qualidade
        da sua resposta.
      </div>
      <button
        id="btn-start"
        className="btn btn--primary"
        onClick={onStart}
      >
        Iniciar diagnóstico
      </button>
    </div>
  );
}
