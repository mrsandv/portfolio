# 📌 Resumen de Migración: Eliminación de Payload CMS & Migración a Next.js Estático

**Fecha:** 31 de Julio, 2026  
**Objetivo:** Reducir peso del proyecto, eliminar la dependencia de MongoDB/Payload CMS y convertir el sitio a un Next.js 16 100% estático, ultra optimizado para rendimiento y SEO (SSG).

---

## 🚀 Cambios Principales Realizados

### 1. Nueva Capa de Datos Estática (`lib/data/`)
Se migraron todos los contenidos dinámicos del CMS a archivos TypeScript nativos, limpios y fuertemente tipados:
* **`lib/data/settings.ts`**: Configuración general del sitio, títulos Hero, subtítulos, links a redes sociales, badges de disponibilidad y palabras clave de SEO para español (`es`) e inglés (`en`).
* **`lib/data/projects.ts`**: Colección de proyectos destacados (`snippet`, `open` y `client`).
* **`lib/data/stack.ts`**: Lista de tecnologías y herramientas.
* **`lib/data/faq.ts`**: Preguntas frecuentes en español e inglés.
* **`lib/data/methodology.ts`**: Pasos de la metodología de trabajo.

### 2. Desacoplamiento de Servicios (`lib/`)
* **`lib/cms-server.ts`**: Ahora exporta `fetchSettings` y `fetchMethodology` sirviendo los datos estáticos desde `lib/data/`.
* **`lib/faq.ts`**: Exporta `fetchFAQ` sirviendo directamente las preguntas frecuentes.
* **`lib/stack-server.ts`**: Exporta `fetchStack` retornando la lista estática.
* **`lib/highlight.ts`**: Procesa la sintaxis con `shiki` directamente sobre `PROJECTS_DATA` sin realizar llamadas a bases de datos ni CMS.

### 3. Eliminación de Archivos y Dependencias de Payload
* **Archivos eliminados**:
  * `app/(payload)/`
  * `payload/`
  * `payload.config.ts`
  * `payload-types.ts`
  * `scripts/seed-*.ts`
* **Dependencias desinstaladas** (`package.json`):
  * `@payloadcms/db-mongodb`
  * `@payloadcms/next`
  * `@payloadcms/richtext-lexical`
  * `@payloadcms/storage-vercel-blob`
  * `payload`
  * `graphql`
  * `sharp`
* **Configuraciones actualizadas**:
  * `next.config.mjs`: Se eliminó el wrapper `withPayload`.
  * `.env.example`: Se removieron variables de MongoDB y Payload.
  * `biome.json`: Se removieron excepciones de archivos de Payload.
  * `package.json`: Se eliminaron scripts de Payload/seed y la llave `pnpm` en desuso.

---

## 🛠️ ¿Cómo agregar o editar contenido en el futuro?

Cuando quieras agregar un proyecto o actualizar tu información:

1. **Proyectos**: Edita [`lib/data/projects.ts`](file:///Users/mrsan/developer/portfolio/lib/data/projects.ts).
2. **Textos / SEO / Redes**: Edita [`lib/data/settings.ts`](file:///Users/mrsan/developer/portfolio/lib/data/settings.ts).
3. **Preguntas Frecuentes**: Edita [`lib/data/faq.ts`](file:///Users/mrsan/developer/portfolio/lib/data/faq.ts).
4. **Stack Tecnológico**: Edita [`lib/data/stack.ts`](file:///Users/mrsan/developer/portfolio/lib/data/stack.ts).
5. **Metodología**: Edita [`lib/data/methodology.ts`](file:///Users/mrsan/developer/portfolio/lib/data/methodology.ts).

Haces un `git commit` y `git push` a tu repositorio, y Vercel/tu hosting compilará las páginas estáticas de forma instantánea.

---

## ✅ Estado de Pruebas
* **`pnpm build`**: Exitoso con **100% de rutas prerenderizadas como estáticas (`○ Static`)**.
* **`pnpm lint`**: Exitoso (**0 errores de formateo o linting con Biome**).
