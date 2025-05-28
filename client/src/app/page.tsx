import Link from 'next/link';
import { Button } from './components/atoms/Button';

export default function UsersIntroPage() {
  return (
    <main className="px-8 py-4 max-w-3xl mx-auto text-surface-900">
      {/* Introducción y visión general */}
      <h1 className="text-4xl font-bold mb-6 text-primary">
        🚀 Challenge Técnico - ABM de Usuarios
      </h1>

      {/* Contexto del proyecto */}
      <section className="mb-6">
        <p className="mb-2">
          Bienvenido a la solución del challenge técnico propuesto por <strong>Dux Software</strong>
          . El objetivo fue construir una aplicación para administrar usuarios (crear, editar,
          eliminar, listar y filtrar) utilizando tecnologías modernas de React y Next.js.
        </p>
        <p className="text-sm text-secondary">
          {/* Flujo de desarrollo resumido */}
          - Utilizamos Server Components para SSR de la tabla principal. <br />- Hydratación en
          cliente con React Query y <code>placeholderData</code>. <br />
          - Hooks personalizados para filtros y formularios. <br />- PrimeReact + PrimeFlex para UI
          consistente y responsiva.
        </p>
      </section>

      {/* Tecnologías empleadas */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">🛠️ Tecnologías Utilizadas</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Next.js 14</strong> con App Router y Server Components
          </li>
          <li>
            <strong>React 18</strong> y estado con <strong>React Query</strong>
          </li>
          <li>
            <strong>PrimeReact</strong> + <strong>PrimeFlex</strong> para UI y utilidades CSS
          </li>
          <li>
            <strong>TypeScript</strong> con DTOs y Zod para validación opcional
          </li>
        </ul>
      </section>

      {/* Variables de entorno */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">🔧 Variables de Entorno</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>
            <code>API_BASE</code>: URL base para SSR (e.g.{' '}
            <em>https://staging.duxsoftware.com.ar/api-test</em>)
          </li>
          <li>
            <code>NEXT_PUBLIC_API_BASE</code>: URL pública para CSR
          </li>
          <li>
            <code>NEXT_PUBLIC_SECTOR_ID</code>: sector por defecto (e.g. 7000)
          </li>
        </ul>
        <p className="text-sm text-secondary mt-2">
          Crea un archivo <code className="text-primary font-bold">.env</code> basado en{' '}
          <code className="text-black font-bold">.env.example</code> y completa estas variables
          antes de iniciar el proyecto.
        </p>
      </section>

      {/* Navegación al CRUD */}
      <div className="mt-2">
        <Link href="/users">
          <Button label="Vamos al proyecto" icon="pi pi-arrow-right" />
        </Link>
        <p className="text-sm text-secondary mt-2">
          🔍 No olvides crear tu <code>.env.local</code> antes de levantar el servidor.
        </p>
      </div>
    </main>
  );
}
