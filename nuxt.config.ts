// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  css: ['~/assets/css/main.css'],
  
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts' // Asegúrate de que esté aquí
  ],

  // Configuración de fuentes
  fonts: {
    families: [
      { name: 'Geist', provider: 'google' }, // Muy moderna y usada por Vercel/Next
      { name: 'Fira Code', provider: 'google' } // Excelente para toques "dev"
    ]
  },

  future: {
    compatibilityVersion: 4
  }
})