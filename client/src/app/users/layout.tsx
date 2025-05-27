import { Header } from '../components/organisms/Header';
import { Sidebar } from '../components/organisms/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen ">
        <Sidebar />
        <main className="flex flex-column flex-grow-1 h-full">{children}</main>
      </div>
    </>
  );
}
