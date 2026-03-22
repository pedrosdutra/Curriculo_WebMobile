"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const WORDS = [
  'REACT', 'JAVASCRIPT', 'TYPESCRIPT', 'NEXTJS', 'COMPONENTE', 'ESTADO', 'PROPS',
  'FUNCAO', 'VARIAVEL', 'HOISTING', 'PROMISSE', 'API', 'NODE', 'NODEJS', 'CSS',
  'HTML', 'DOM', 'GITHUB', 'ALGORITMO', 'GIT', 'PACKAGE', 'WEBPACK', 'BABEL',
  'STRINGS', 'ARRAY', 'OBJETO', 'ASYNC', 'AWAIT', 'REDUX', 'MOBILE', 'RESPONSIVE',
  'ACESSIBILIDADE', 'TIPAGEM', 'COMPILADOR', 'TESTES', 'INTERFACE', 'UX', 'SEO'
];

const MAX_ERRORS = 7;

function pickWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export default function Forca() {
  const [palavra, setPalavra] = useState(pickWord());
  const [tentativasRestantes, setTentativasRestantes] = useState(MAX_ERRORS);
  const [letrasCorretas, setLetrasCorretas] = useState<string[]>([]);
  const [letrasErradas, setLetrasErradas] = useState<string[]>([]);
  const [entrada, setEntrada] = useState('');
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const exibePalavra = useMemo(() => {
    return palavra
      .split('')
      .map((l) => (letrasCorretas.includes(l) ? l : '_'))
      .join(' ');
  }, [palavra, letrasCorretas]);

  const tentouEssa = useCallback(
    (letter: string) =>
      letrasCorretas.includes(letter) || letrasErradas.includes(letter),
    [letrasCorretas, letrasErradas]
  );

  const isVitoria = useMemo(() => !exibePalavra.includes('_'), [exibePalavra]);
  const isDerrota = tentativasRestantes <= 0;

  useEffect(() => {
    if (status === 'playing') {
      if (isVitoria) setStatus('won');
      if (isDerrota) setStatus('lost');
    }
  }, [status, isVitoria, isDerrota]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (status !== 'playing') return;

    const letra = entrada.trim().toUpperCase();
    if (!letra || letra.length !== 1 || !/^[A-ZÀ-Ÿ]$/.test(letra)) {
      setEntrada('');
      return;
    }
    if (tentouEssa(letra)) {
      setEntrada('');
      return;
    }

    if (palavra.includes(letra)) {
      setLetrasCorretas((prev) => [...prev, letra]);
    } else {
      setLetrasErradas((prev) => [...prev, letra]);
      setTentativasRestantes((prev) => Math.max(0, prev - 1));
    }

    setEntrada('');
  };

  const reiniciar = () => {
    setPalavra(pickWord());
    setTentativasRestantes(MAX_ERRORS);
    setLetrasCorretas([]);
    setLetrasErradas([]);
    setEntrada('');
    setStatus('playing');
  };

  const etapa = MAX_ERRORS - tentativasRestantes;

  return (
    <main className="forca">
      <div className="forca-card">
        <h1>Jogo da Forca</h1>
        <p>Palavra de {palavra.length} letras</p>

        <div className="forca-hangman" aria-label="Boneco da forca">
          <div className="gallows" />
          <div className={`hangman-part head ${etapa > 0 ? 'visible' : ''}`} />
          <div className={`hangman-part body ${etapa > 1 ? 'visible' : ''}`} />
          <div className={`hangman-part left-arm ${etapa > 2 ? 'visible' : ''}`} />
          <div className={`hangman-part right-arm ${etapa > 3 ? 'visible' : ''}`} />
          <div className={`hangman-part left-leg ${etapa > 4 ? 'visible' : ''}`} />
          <div className={`hangman-part right-leg ${etapa > 5 ? 'visible' : ''}`} />
          <div className={`hangman-part rope ${etapa > 6 ? 'visible' : ''}`} />
        </div>

        <div className="word-display" aria-live="polite">
          {exibePalavra.split(' ').map((letra, idx) => (
            <span key={idx} className="letter">
              {letra}
            </span>
          ))}
        </div>

        <div className="status-area">
          {status === 'won' && (
            <p className="status won">
              🎉 Parabéns! Você venceu! A palavra é <strong>{palavra}</strong>.
            </p>
          )}
          {status === 'lost' && (
            <p className="status lost">
              😢 Você perdeu! A palavra era <strong>{palavra}</strong>.
            </p>
          )}
          {status === 'playing' && (
            <p>🏃 Tentativas restantes: {tentativasRestantes}</p>
          )}
        </div>

        <form className="input-area" onSubmit={handleSubmit}>
          <label htmlFor="letter-input">Digite uma letra</label>
          <input
            id="letter-input"
            type="text"
            maxLength={1}
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            disabled={status !== 'playing'}
            aria-label="Digite uma letra"
          />
          <button type="submit" disabled={status !== 'playing'}>
            Enviar
          </button>
        </form>

        <div className="tries">
          <div>
            <h3>Letras certas</h3>
            <p>{letrasCorretas.join(', ') || '-'}</p>
          </div>
          <div>
            <h3>Letras erradas</h3>
            <p>{letrasErradas.join(', ') || '-'}</p>
          </div>
        </div>

        <div className="actions">
          <button onClick={reiniciar}>Reiniciar</button>
          <Link href="/" className="btn-link">
            Voltar ao currículo
          </Link>
        </div>
      </div>
    </main>
  );
}
