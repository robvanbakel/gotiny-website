import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/main.scss", "~/assets/404.scss"],
  modules: ["@nuxtjs/eslint-module"],
  eslint: {
    lintOnStart: false,
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
    },
  },
});
