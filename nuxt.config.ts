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
      title: "GoTiny | The most lightweight link shortener API",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ],
      meta: [
        {
          property: "og:title",
          content: "GoTiny | The most lightweight link shortener API",
        },
        {
          property: "og:url",
          content: "https://www.gotiny.cc",
        },
        {
          property: "og:title",
          content: "/gotiny_banner.jpg",
        },
      ],
    },
  },
});
