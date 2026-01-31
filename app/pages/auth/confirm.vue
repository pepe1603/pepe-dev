<!-- app/pages/auth/confirm.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  title: 'Confirmando...',
  name: 'auth-confirm',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

onMounted(() => {
  // ✅ MANEJO SEGURO DE ERRORES (tipado correcto)
  if (route.query.error) {
    // Extrae mensaje seguro: maneja string, array o undefined

    const errorMsg = String(
      Array.isArray(route.query.error)
        ? route.query.error[0]
        : route.query.error ?? ''
    )

    const isExpired = errorMsg.toLowerCase().includes('expired')

    
    toast.add({
      title: 'Enlace inválido',
      description: isExpired
        ? '⏰ El enlace expiró (válido 1 hora). Solicita uno nuevo.'
        : '🔍 Verifica que el enlace esté completo y ábrelo en el MISMO navegador donde lo solicitaste.',
      icon: 'i-lucide-alert-triangle',
      color: 'warning', // Más amigable que "error" para casos comunes
      duration: 10000,
    })

    // Redirección inteligente según tipo de error
    setTimeout(() => {
      router.push(
        route.query.type === 'recovery' 
          ? '/auth/forgot-password' 
          : '/auth/login'
      )
    }, 3500)
    return
  }

  // ✅ REDIRECCIÓN SEGURA (con validación de tipo)
  const type = route.query.type?.toString()
  
  if (type === 'recovery') {
    toast.add({
      title: '✅ Listo',
      description: 'Define tu nueva contraseña',
      icon: 'i-lucide-check-circle',
      color: 'success',
      duration: 2500,
    })
    router.push('/auth/reset-password')
  } 
  // Para otros flujos (signup, magiclink, etc.)
  else if (type) {
    const next = route.query.next?.toString() || '/admin'
    router.push(next)
  } 
  // Caso fallback (nunca debería ocurrir con configuración correcta)
  else {
    console.warn('[auth/confirm] Tipo de autenticación no reconocido en URL')
    router.push('/auth/login')
  }
})
</script>

<template>
  <div class="text-center space-y-6 py-12">
    <div class="flex justify-center">
      <UIcon 
        name="i-lucide-loader-2" 
        class="w-16 h-16 animate-spin text-primary" 
      />
    </div>
    
    <div>
      <h1 class="text-2xl font-bold">Verificando enlace...</h1>
      <p class="text-muted-foreground mt-2">
        ⏳ Este proceso toma menos de 5 segundos
      </p>
    </div>
    
    <div class="text-sm text-muted-foreground max-w-md mx-auto p-4 bg-muted/30 rounded-lg">
      <p class="font-medium">🔒 ¿Por qué este paso?</p>
      <ul class="mt-2 space-y-1.5 text-left list-disc list-inside text-sm">
        <li>Validamos que eres tú (no un atacante)</li>
        <li>El enlace funciona SOLO en este navegador</li>
        <li>Expira en 60 minutos por seguridad</li>
      </ul>
    </div>
  </div>
</template>