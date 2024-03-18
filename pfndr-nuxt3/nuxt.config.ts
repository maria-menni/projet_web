export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt3-leaflet',
    '@nuxtjs/tailwindcss'
  ],
  i18n: {
    vueI18n: './i18n.config.ts'
  },
})
