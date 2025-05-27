import Link from 'next/link';
import { Button } from './components/atoms/Button';

export default function UsersIntroPage() {
  return (
    <main className="p-8 max-w-3xl mx-auto text-surface-900">
      <h1 className="text-4xl font-bold mb-6 text-primary">
        🚀 Challenge Técnico - ABM de Usuarios
      </h1>

      <section className="mb-6">
        <p className="mb-2">
          Bienvenido a la solución del challenge técnico propuesto por <strong>Dux Software</strong>
          . El objetivo fue construir una aplicación para administrar usuarios (crear, editar,
          eliminar, listar y filtrar) utilizando tecnologías modernas del ecosistema React y
          Next.js.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">🛠️ Tecnologías Utilizadas</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Next.js 14</strong> con App Router y Server Components
          </li>
          <li>
            <strong>React 18</strong> y manejo de estado con <strong>React Query</strong>
          </li>
          <li>
            <strong>PrimeReact</strong> + <strong>PrimeFlex</strong> para UI y estilos utilitarios
          </li>
          <li>
            <strong>TypeScript</strong> con tipado DTO y modularización clara
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">📐 Enfoque técnico</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Implementación de SSR para performance y mejor SEO</li>
          <li>Separación entre Server Components y Client Components usando Suspense</li>
          <li>
            Uso de <code className="bg-surface-200 px-1 rounded">React Query</code> con{' '}
            <code>initialData</code> para hidratación eficiente
          </li>
          <li>Diseño atómico de componentes para facilitar reutilización y escalabilidad</li>
          <li>Validaciones en formularios, feedback visual y skeleton loaders</li>
        </ul>
      </section>

      <div className="mt-8">
        <Link href="/users">
          <Button label="Ver tabla de usuarios" icon="pi pi-arrow-right" />
        </Link>
      </div>
    </main>
  );
}
