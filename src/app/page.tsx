import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Meu Currículo & Portfólio</h1>
        <p>
          Bem-vindo! Aqui está um site de currículo com um mini-projeto: o Jogo da Forca.
          Navegue para testar suas habilidades de adivinhação.
        </p>
        <Link href="/forca" className="btn">
          Ir para Jogo da Forca
        </Link>
      </section>

      <section className="cliente">
        <h2>Sobre mim</h2>
        <p>
          Desenvolvedor Web com foco em React, Next.js e CSS moderno. Este portfólio
          mostra habilidade em interatividade, estado e design responsivo.
        </p>
      </section>

      <section className="skills">
        <h2>Habilidades</h2>
        <ul>
          <li>React</li>
          <li>Next.js</li>
          <li>TypeScript</li>
          <li>HTML5 / CSS3 / SASS</li>
          <li>Node.js</li>
        </ul>
      </section>
    </main>
  );
}
