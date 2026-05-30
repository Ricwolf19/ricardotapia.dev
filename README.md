# ricardotapia.dev

Portafolio personal y sitio profesional de **Ricardo Tapia** — desarrollador full-stack con sede en Chihuahua, México. Un sitio web bilingüe (español/inglés), estáticamente generado, con estética de desarrollador inspirada en [Zed.dev](https://zed.dev).

🔗 **En vivo:** [ricardotapia.dev](https://ricardotapia.dev)

---

## 🚀 Stack Tecnológico

| Capa                    | Tecnología                                                      |
| ----------------------- | --------------------------------------------------------------- |
| **Framework**           | [Next.js 15](https://nextjs.org/) (App Router)                  |
| **Lenguaje**            | [TypeScript 5.7](https://www.typescriptlang.org/)               |
| **Estilos**             | [Tailwind CSS v4](https://tailwindcss.com/)                     |
| **UI**                  | Biblioteca de componentes propia (sin frameworks externos)      |
| **Animación**           | [Motion](https://motion.dev/) (sucesor de Framer Motion)        |
| **i18n**                | [next-intl](https://next-intl-docs.vercel.app/)                 |
| **Contenido**           | [MDX](https://mdxjs.com/) vía `next-mdx-remote` + `gray-matter` |
| **Resaltado de código** | `rehype-pretty-code` + [Shiki](https://shiki.style/)            |
| **Iconos**              | [Lucide React](https://lucide.dev/) + React Icons               |
| **Temas**               | `next-themes` (modo oscuro/claro)                               |
| **Fuentes**             | Inter (sans) + JetBrains Mono (mono) vía `next/font`            |
| **Validación**          | [Zod](https://zod.dev/)                                         |
| **CI/CD**               | [GitHub Actions](https://github.com/features/actions) (Node 24) |

---

## ✨ Características

### 🌐 Internacionalización (i18n)

- **Dos idiomas:** español (`es`, por defecto) e inglés (`en`)
- URLs con prefijo de locale: `/es/`, `/en/`
- Mensajes traducidos en `messages/en.json` y `messages/es.json`
- Sistema de sobrescritura de localización en `src/data/localize.ts`

### 🎨 Temas

- Modo oscuro por defecto, con soporte para modo claro
- Tokens de diseño personalizados en CSS
- Sin flash de tema gracias a `next-themes`

### 📝 Case Studies en MDX

- Proyectos con contenido rico en `content/projects/*.mdx`
- Frontmatter YAML + cuerpo Markdown/MDX
- Resaltado de sintaxis con tema "GitHub Dark Dimmed"
- Componentes MDX personalizados

### 📬 Página de Contacto

- Formulario de contacto con campos: nombre, email, asunto y mensaje
- Widget flotante de WhatsApp
- Enlace directo a email

### 🖼️ Showcase de Proyectos

- 10+ proyectos catalogados
- Categorías: SaaS, ERP, E-commerce, Plataforma, Marketing, Open Source
- Soporte para monorepos con sub-aplicaciones
- Filtrado por categoría y ordenamiento por prioridad

### 🧑‍💻 Sobre Mí

- Bio profesional
- Línea de tiempo de experiencia laboral
- Stack tecnológico visualizado

### 📄 Página "Now"

- Muestra proyectos actualmente activos

---

## 📁 Estructura del Proyecto

```
ricardotapia.dev/
├── .github/workflows/ci.yml    # Pipeline de CI
├── content/projects/           # Case studies en MDX
│   ├── cafe-combate.mdx
│   ├── listkit.mdx
│   └── ...
├── messages/
│   ├── en.json                 # Traducciones en inglés
│   └── es.json                 # Traducciones en español
├── next.config.ts              # Configuración de Next.js
├── src/
│   ├── app/
│   │   ├── [locale]/           # Rutas con locale
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── now/page.tsx
│   │   │   ├── work/page.tsx
│   │   │   ├── work/[slug]/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/             # Header, Footer, Section, etc.
│   │   ├── mdx/                # Componentes MDX personalizados
│   │   ├── motion/             # Utilidades de animación
│   │   ├── sections/           # Secciones de páginas
│   │   └── ui/                 # Componentes base (Badge, Button, Input, etc.)
│   ├── data/
│   │   ├── constants.ts        # Constantes de la app
│   │   ├── experience.ts       # Historial laboral
│   │   ├── localize.ts         # Sobrescrituras en inglés
│   │   ├── projects.ts         # Catálogo de proyectos
│   │   ├── site.ts             # Configuración del sitio
│   │   └── technologies.ts     # Catálogo de tecnologías
│   ├── i18n/
│   │   ├── request.ts          # Configuración de requests de next-intl
│   │   └── routing.ts          # Definición de rutas i18n
│   ├── lib/
│   │   ├── mdx.ts              # Lectura y parsing de MDX
│   │   └── utils.ts            # Utilidades (cn, localized, formatDateRange)
│   ├── styles/
│   │   └── globals.css         # Tailwind v4 + tokens de diseño
│   ├── types/
│   │   └── index.ts            # Tipos globales
│   └── middleware.ts           # Middleware de next-intl
```

---

## 🛠️ Desarrollo Local

### Requisitos

- [Node.js](https://nodejs.org/) 24+
- [npm](https://www.npmjs.com/) 10+

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Ricwolf19/ricardotapia.dev.git
cd ricardotapia.dev

# Instalar dependencias
npm install
```

### Scripts Disponibles

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar servidor de producción
npm start

# Linting con ESLint
npm run lint

# Type checking con TypeScript
npm run typecheck

# Verificar formato con Prettier
npm run format

# Corregir formato con Prettier
npm run format:fix

# Pipeline completo de CI (format + lint + typecheck + build)
npm run ci
```

### Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=https://ricardotapia.dev
GITHUB_USERNAME=tu-usuario
CONTACT_EMAIL=tu@email.com
WHATSAPP_NUMBER=521XXXXXXXXXX
```

---

## 🌍 Configuración de i18n

El proyecto usa `next-intl` con la siguiente configuración:

- **Locales:** `es` (español), `en` (inglés)
- **Locale por defecto:** `es`
- **Prefijo:** Siempre presente en URLs (`/es/`, `/en/`)
- **Archivos de mensajes:** `messages/en.json`, `messages/es.json`

### Patrón de localización de datos

Los proyectos y la experiencia laboral se escriben en español como fuente de verdad. Las sobrescrituras en inglés viven en `src/data/localize.ts` y se aplican en tiempo de ejecución mediante la utilidad `localized()`.

---

## 📝 Gestión de Contenido (Proyectos MDX)

- **Ubicación:** `content/projects/*.mdx`
- **Frontmatter:** `title`, `slug`, `tagline`, `status`, `visibility`, `category`, `startDate`, `launchDate`, `thumbnail`, `gallery`, `links`, `tags`, `technologies`
- **Cuerpo:** Markdown/MDX estándar con bloques de código resaltados
- **Lectura:** `src/lib/mdx.ts` usa `fs` + `gray-matter` para parsear en build time
- **Renderizado:** `src/app/[locale]/work/[slug]/page.tsx` usa `compileMDX` con componentes personalizados

---

## 🔒 Seguridad

El proyecto mantiene sus dependencias actualizadas para mitigar vulnerabilidades conocidas. Si detectas alguna dependencia desactualizada o vulnerable, por favor abre un issue.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

<p align="center">
  Hecho con ❤️ por <a href="https://ricardotapia.dev">Ricardo Tapia</a>
</p>
