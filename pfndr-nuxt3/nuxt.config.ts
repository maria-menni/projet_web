export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
    'nuxt3-leaflet',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    'nuxt-icon',
  ],
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  runtimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
})
