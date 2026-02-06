<!-- app/pages/auth/login.vue -->
<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, AuthFormField } from '#ui/types'
import { useAuthLoginUseCase } from '~/composables/auth/usecases/useAuthLoginUseCase'

definePageMeta({
  layout: 'auth',
  title: 'Iniciar sesión',
  name: 'auth-login',
})

const toast = useToast()
const { login, loading } = useAuthLoginUseCase()


// Schema de validación con Zod
const schema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
})

type Schema = z.output<typeof schema>

// Configuración de campos del formulario
const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'correo@ejemplo.com',
    autocomplete: 'email',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Contraseña',
    placeholder: '••••••••',
    autocomplete: 'current-password',
    required: true,
  },
]

const submitError = ref<string | null>(null)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  submitError.value = null

  const { error } = await login({
    email: event.data.email,
    password: event.data.password,
  })

  if (error) {
    submitError.value = error.message ?? 'Credenciales inválidas'
    toast.add({
      title: 'Error de autenticación',
      description: 'Revisa tus credenciales e intenta nuevamente.',
      icon: 'i-lucide-shield-x',
      color: 'error',
    })
  } else {
    toast.add({
      title: 'Bienvenido',
      description: 'Es un gusto tenerte de vuelta!',
      icon: 'i-lucide-shield-check',
      color: 'success',
    })

    await navigateTo('/admin', { replace: true })
  }
  
}

function showRestrictedAccessInfo() {
  toast.clear()
  toast.add({
    title: 'Acceso restringido',
    description:
      'Por razones de seguridad, el registro público no está disponible. El acceso está reservado únicamente para la administración del portafolio.',
    icon: 'i-lucide-lock',
    color: 'secondary',
  })
}
</script>

<template>
  <UAuthForm
    :schema="schema"
    :fields="fields"
    title="Iniciar sesión"
    icon="i-lucide-lock-keyhole"
    :loading="loading"
    :submit="{ label: 'Iniciar sesión', block: true, size: 'lg' }"
    @submit="onSubmit"
  >
    <!-- Descripción personalizada -->
    <template #description>
      Accede con tus credenciales de administrador.
    </template>

    <!-- Enlace de "Olvidé mi contraseña" debajo del campo password -->
    <template #password-hint>
      <ULink
        to="/auth/forgot-password"
        class="text-primary font-medium text-sm"
        tabindex="-1"
      >
        ¿Olvidaste tu contraseña?
      </ULink>
    </template>

    <!-- Mensaje de error de validación -->
    <template v-if="submitError" #validation>
      <UAlert
        color="error"
        icon="i-lucide-alert-triangle"
        :title="submitError"
      />
    </template>

    <!-- Footer con info de registro -->
    <template #footer>
      <div class="flex flex-col items-center gap-3 text-center">
        <USeparator label="o" />

        <UButton
          variant="link"
          color="neutral"
          size="sm"
          :disabled="loading"
          @click="showRestrictedAccessInfo"
        >
          Crear cuenta
        </UButton>

        <p class="text-xs text-muted">
          El inicio de sesión está habilitado únicamente para fines
          administrativos.
        </p>
      </div>
    </template>
  </UAuthForm>
</template>
