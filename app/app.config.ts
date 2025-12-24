// app/app.config.ts
export default defineAppConfig({
  ui: {
    // Definición de los nuevos Semantic Tokens de Nuxt UI v3/v4
    colors: {
      primary: 'cyan',    // Tu color morado principal
      secondary: 'gray',  // Un color que contrasta bien con el morado
      neutral: 'slate',     // Escala de grises para textos y fondos
      
      // Tokens de estado (puedes personalizarlos o dejar los por defecto)
      success: 'emerald',
      error: 'rose',
      warning: 'amber',
      info: 'blue'
    }
  }
})