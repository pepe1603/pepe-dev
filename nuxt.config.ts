// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxtjs/supabase", // ✅ Módulo oficial maneja PKCE automáticamente
  ],

  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm', // ✅ Página gestionada POR EL MÓDULO
      exclude: [
        '/',
        '/about-me',
        '/projects',
        '/projects/*',
        '/auth/*'
      ],
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true, // Solo desarrollo - ¡Cambiar a true en producción!
    },
    clientOptions: {
      auth: {
        // 🔑 CAMBIO CRÍTICO: PKCE es OBLIGATORIO desde 2025
        flowType: 'pkce', 
        detectSessionInUrl: true, // Necesario para PKCE
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  css: ["~/assets/css/main.css"],

  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: false,
  },

  fonts: {
    families: [
      { name: "Geist", provider: "google" },
      { name: "Fira Code", provider: "google" },
    ],
  },
})