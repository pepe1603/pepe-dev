<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, AuthFormField } from '#ui/types'
import { useAuthResetPassword } from '~/composables/auth/usecases/useAuthResetPassword'

definePageMeta({
  layout: 'auth',
  title: 'Nueva contraseña',
  name: 'auth-reset-password',
})

// ✅ ELIMINADO: whenever() + redirección manual
// El módulo @nuxtjs/supabase YA validó la sesión en /auth/confirm
const user = useSupabaseUser()
const { loading, error, success, resetPassword } = useAuthResetPassword()

// ✅ NUEVO: Validación visual si no hay sesión (caso edge: URL escrita manualmente)
const hasValidSession = computed(() => !!user.value)

const schema = z.object({
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Una mayúscula')
    .regex(/[0-9]/, 'Un número'),
  confirmPassword: z.string().min(8, 'Mínimo 8 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '❌ Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

type Schema = z.output<typeof schema>

const fields: AuthFormField[] = [
  {
    name: 'password',
    type: 'password',
    label: 'Nueva contraseña',
    placeholder: '••••••••',
    required: true,
    description: 'Mínimo 8 caracteres, 1 mayúscula y 1 número',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirmar contraseña',
    placeholder: '••••••••',
    required: true,
  },
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await resetPassword(event.data.password)
}
</script>

<template>
<div>
    <!-- ✅ CASO EDGE: Usuario accede directamente a URL sin sesión válida -->
  <div v-if="!hasValidSession" class="max-w-md mx-auto">
    <UAlert 
      color="warning" 
      title="⚠️ Sesión no válida" 
      icon="i-lucide-shield-alert"
      class="mb-6"
    >
      <template #description>
        <div class="space-y-3">
          <p>Para restablecer tu contraseña necesitas:</p>
          <ul class="list-disc list-inside space-y-1 text-sm">
            <li>Haber solicitado el enlace desde esta página</li>
            <li>Abrir el enlace en el MISMO navegador</li>
            <li>Usar el enlace antes de 60 minutos</li>
          </ul>
          <UButton 
            variant="solid" 
            color="primary" 
            :to="{ name: 'auth-forgot-password' }" 
            class="w-full mt-2"
            icon="i-lucide-arrow-left"
          >
            Solicitar nuevo enlace
          </UButton>
        </div>
      </template>
    </UAlert>
    
    <UCard>
      <template #header>
        <div class="flex items-center gap-2 text-muted-foreground">
          <UIcon name="i-lucide-info" />
          <span>¿Necesitas ayuda?</span>
        </div>
      </template>
      <p class="text-sm">
        Si ya solicitaste el enlace pero no funciona:
        <br />
        • Verifica tu carpeta de spam
        <br />
        • Usa el mismo navegador donde solicitaste el cambio
        <br />
        • Espera 2 minutos antes de solicitar uno nuevo
      </p>
    </UCard>
  </div>

  <!-- ✅ FLUJO NORMAL: Sesión válida (99% de casos) -->
  <UAuthForm
    v-else
    :schema="schema"
    :fields="fields"
    title="🔐 Nueva contraseña"
    description="Define una contraseña segura para tu cuenta"
    icon="i-lucide-key-round"
    :loading="loading"
    :submit="{ 
      label: success ? 'Redirigiendo...' : 'Actualizar contraseña', 
      block: true, 
      size: 'lg',
      disabled: loading || !!success 
    }"
    @submit="onSubmit"
  >
    <template #validation>
      <UAlert 
        v-if="error" 
        color="error" 
        :title="error" 
        icon="i-lucide-alert-circle"
      />
      <UAlert 
        v-if="success" 
        color="success" 
        :title="success" 
        icon="i-lucide-check-circle"
        class="animate-fade-in"
      />
    </template>
    
    <template #footer>
      <div class="text-center text-sm text-muted-foreground mt-2">
        <p>🔒 Tu contraseña se actualiza de forma segura con encriptación AES-256</p>
      </div>
    </template>
  </UAuthForm>
</div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>