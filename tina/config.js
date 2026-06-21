import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "diario",
        label: "Diario",
        path: "src/content/diario",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Fecha",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Etiquetas",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Cuerpo",
            isBody: true,
          },
        ],
      },
      {
        name: "settings",
        label: "Ajustes de Estética",
        path: "src/content/settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "siteTitle",
            label: "Título del Diario",
            required: true,
          },
          {
            type: "string",
            name: "siteDescription",
            label: "Descripción del Diario",
          },
          {
            type: "string",
            name: "authorName",
            label: "Nombre del Autor",
          },
          {
            type: "string",
            name: "theme",
            label: "Tema de Color",
            options: [
              { value: "dark", label: "Oscuro Absoluto (#0d0d0d)" },
              { value: "light", label: "Claro Minimalista (#fbfbfb)" },
              { value: "sepia", label: "Sepia / Vintage (#f4ecd8)" },
              { value: "cyberpunk", label: "Cyberpunk (#120136)" }
            ],
          },
          {
            type: "string",
            name: "primaryColor",
            label: "Color de Acento",
            ui: {
              component: "color",
            },
          },
          {
            type: "string",
            name: "fontFamily",
            label: "Tipografía",
            options: [
              { value: "monospace", label: "Monoespacio (Monospace)" },
              { value: "sans-serif", label: "Sin Serifas (Sans-Serif)" },
              { value: "serif", label: "Con Serifas (Serif)" }
            ],
          },
        ],
      },
    ],
  },
});

