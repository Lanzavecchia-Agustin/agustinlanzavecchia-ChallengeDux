import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { PrimeReactProvider } from 'primereact/api';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'ABM de Usuarios • Dux Software',
  description: 'CRUD de usuarios con Next14 + React18 + PrimeReact',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PrimeReactProvider>
          <main className="flex flex-column flex-grow-1 p-4 h-screen">{children}</main>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
