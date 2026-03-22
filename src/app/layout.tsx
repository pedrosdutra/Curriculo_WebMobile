import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Currículo & Portfólio',
  description: 'Currículo e portfolio com jogo da forca em Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
