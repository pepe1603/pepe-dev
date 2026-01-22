<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  name: 'auth-home',
  middleware: 'guest',
})

const toast = useToast()
const alertOpen = ref(false) // ✅ Inicia en false
const remainingTime = ref(5)

let autoCloseTimer: ReturnType<typeof setTimeout> | null = null
let countdownInterval: ReturnType<typeof setInterval> | null = null

const onRegisterClick = () => {
  // Toast inmediato
  toast.add({
    title: 'Acceso restringido',
    description:
      'Por razones de seguridad, el registro público no está disponible.',
    icon: 'i-lucide-lock',
    color: 'secondary',
  })

  // Limpiar timers previos
  if (autoCloseTimer) clearTimeout(autoCloseTimer)
  if (countdownInterval) clearInterval(countdownInterval)

  // Reiniciar y mostrar alert
  remainingTime.value = 15
  alertOpen.value = true

  // Countdown cada segundo
  countdownInterval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      if (countdownInterval) clearInterval(countdownInterval)
    }
  }, 1000)

  // Auto-close después de 15 segundos
  autoCloseTimer = setTimeout(() => {
    alertOpen.value = false
    if (countdownInterval) clearInterval(countdownInterval)
  }, 15000)
}

// Limpiar timers si se cierra manualmente
watch(alertOpen, (isOpen) => {
  if (!isOpen) {
    if (autoCloseTimer) clearTimeout(autoCloseTimer)
    if (countdownInterval) clearInterval(countdownInterval)
  }
})
</script>

<template>
  <div class="text-center space-y-6">
    <!-- ALERT: Solo renderiza cuando alertOpen = true -->
    <Transition
      enter-active-class="transition-all duration-250 ease-out"
      enter-from-class="opacity-0 -translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-2 scale-95"
    >
      <UAlert
        v-if="alertOpen"
        color="neutral"
        variant="soft"
        icon="i-lucide-shield"
        title="Registro deshabilitado"
        :close="true"
        @close="alertOpen = false"
      >
        <template #description>
          <div class="flex items-center justify-between flex-wrap gap-3">
            <span class="flex-1">
              Este proyecto no permite registros públicos. El acceso está limitado a cuentas previamente autorizadas.
            </span>
            <UBadge
              color="neutral"
              variant="subtle"
              size="md"
              class="shrink-0"
            >
              <div class="flex items-center gap-1.5">
                <UIcon name="i-lucide-timer" class="size-4" />
                <span class="font-medium">{{ remainingTime }}s</span>
              </div>
            </UBadge>
          </div>
        </template>
      </UAlert>
    </Transition>

    <!-- CONTENIDO -->
    <div class="space-y-2">
      <h2 class="text-2xl font-semibold">
        Acceso a la plataforma
      </h2>
      <p class="text-muted">
        Inicia sesión para continuar.
      </p>
    </div>

    <div class="flex gap-3 justify-center">
      <UButton
        :to="{ name: 'auth-login' }"
        size="lg"
        variant="solid"
      >
        Iniciar sesión
      </UButton>

      <UButton
        size="lg"
        variant="outline"
        @click="onRegisterClick"
      >
        Crear cuenta
      </UButton>
    </div>
  </div>
</template>
