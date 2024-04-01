import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/main.scss", "~/assets/404.scss"],
  modules: ["@nuxtjs/eslint-module"],
  eslint: {
    lintOnStart: false,
  },
  runtimeConfig: {
    rootApi: process.env.ROOT_API,
  },
});
