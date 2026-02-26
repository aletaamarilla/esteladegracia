# Estela de Gracia

Sitio web de psicologia creado con Astro, con componentes interactivos en React y contenido estructurado para blog y recursos.

## Vista general

- Landing principal con secciones informativas y CTA.
- Paginas de servicios, FAQ, contacto, testimonios y sobre mi.
- Blog y recursos en formato Markdown (`src/content`).
- Assets multimedia en `public`, incluyendo imagenes y videos.

## Stack tecnologico

- `Astro` para renderizado de paginas.
- `React` para islas interactivas.
- `TypeScript` para tipado.
- `Tailwind CSS` para estilos.
- `Sanity` para integracion de contenido CMS.

## Estructura del proyecto

```text
/
├── public/                 # Imagenes, iconos, videos y archivos estaticos
├── sanity/                 # Configuracion/integracion con Sanity
├── src/
│   ├── components/         # Componentes UI e islas React
│   ├── content/            # Blog y recursos en Markdown
│   ├── data/               # Datos estaticos (servicios, FAQ, etc.)
│   ├── layouts/            # Layouts base de paginas
│   ├── pages/              # Rutas del sitio
│   ├── sections/           # Secciones reutilizables de pagina
│   └── styles/             # Estilos globales
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Requisitos

- `Node.js` 18+ recomendado
- `npm` 9+ recomendado

## Instalacion y desarrollo

```bash
npm install
npm run dev
```

La app quedara disponible en `http://localhost:4321`.

## Scripts utiles

| Comando | Descripcion |
| :-- | :-- |
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de produccion en `dist/` |
| `npm run preview` | Previsualiza el build de produccion |
| `npm run astro -- --help` | Muestra ayuda del CLI de Astro |

## Variables de entorno

1. Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

2. Completa las variables necesarias segun tu entorno.

> No subas `.env` al repositorio.

## Despliegue

Flujo recomendado:

```bash
npm run build
npm run preview
```

Cuando valides el resultado, despliega el contenido generado en `dist/` en tu plataforma objetivo.

## Autor

Proyecto de sitio web para **Estela de Gracia**.
