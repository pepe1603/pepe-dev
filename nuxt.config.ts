// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/fonts', // Asegúrate de que esté aquí
    '@nuxtjs/supabase', // El módulo oficial
  ],

  supabase: {
    redirect: false,

  },

  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.NUXT_PUBLIC_SUPABASE_URL,
        key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
        redirectOptions: {
          login: 'auth-home',
          callback: '/confirm',
          exclude: ['/*', '/contact', '/about', '/projects/*', '/api/*',],
        },
        cookieOptions: {
          maxAge: 60 * 60 * 8, // 8 horas
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production'
        },
        storage: true,
      },
      
    }
  },


  future: {
    compatibilityVersion: 4
  },
  
  css: ['~/assets/css/main.css'],

   app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },

    // Configuración de fuentes
  fonts: {
    families: [
      { name: 'Geist', provider: 'google' }, // Muy moderna y usada por Vercel/Next
      { name: 'Fira Code', provider: 'google' } // Excelente para toques "dev"
    ]
  },
  
  
})

