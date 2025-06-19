import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { PrimeReactProvider } from 'primereact/api';
import { QueryClientProviderWrapper } from './providers/query-client-provider';
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
      <body className={`${geistSans.variable} ${geistMono.variable}`} style={{ margin: 0 }}>
        <PrimeReactProvider>
          <div className="flex min-h-screen ">
            <QueryClientProviderWrapper>
              <main className="flex flex-column flex-grow-1 h-full">{children}</main>
            </QueryClientProviderWrapper>
          </div>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
