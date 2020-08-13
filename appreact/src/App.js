import React, { useState } from "react";
import Radio from "./Form/Radio";

const perguntas = [
  {
    pergunta: "Qual cor não é da bandeira do Brasil?",
    options: ["Vermelho", "Verde", "Amarelo", "Azul"],
    resposta: "Vermelho",
    id: "p1",
  },
  {
    pergunta: "Qual cor tem na bandeira do Jopão?",
    options: ["Vermelho", "Verde", "Amarelo", "Azul"],
    resposta: "Vermelho",
    id: "p2",
  },
  {
    pergunta: "Qual cidade não é de MG?",
    options: ["São Paulo", "Varginha", "Extrema", "Santa Rita"],
    resposta: "São Paulo",
    id: "p3",
  },
];

function App() {
  const [respostas, setRespostas] = useState({
    p1: "",
    p2: "",
    p3: "",
    p4: "",
  });

  const [slide, setSlide] = useState(0);

  const [result, setResult] = useState("");

  const handleChange = ({ target }) => {
    setRespostas({ ...respostas, [target.id]: target.value });
  };

  const resultado = () => {
    const corretas = perguntas.filter(
      ({ id, resposta }) => respostas[id] === resposta
    );
    setResult(`Você acertou: ${corretas.length} de ${perguntas.length}`);
  };

  const handleClick = () => {
    if (slide < perguntas.length - 1) {
      setSlide(slide + 1);
    } else {
      setSlide(slide + 1);
      resultado();
    }
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      {perguntas.map((pergunta, index) => (
        <Radio
          active={slide === index}
          key={pergunta.id}
          value={respostas[pergunta.id]}
          onChange={handleChange}
          {...pergunta}
        />
      ))}

      {result ? (
        <p>{result}</p>
      ) : (
        <button onClick={handleClick}>Próxima</button>
      )}
    </form>
  );
}

export default App;
