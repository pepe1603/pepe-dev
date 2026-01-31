<!-- app/pages/auth/forgot-password.vue -->
<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent, AuthFormField } from '#ui/types'
import { useAuthResetPassword } from '~/composables/auth/usecases/useAuthResetPassword'

definePageMeta({
  layout: 'auth',
  title: 'Recuperar contraseña',
  name: 'auth-forgot-password',
})

const { loading, error, success, sendResetEmail } = useAuthResetPassword()

const schema = z.object({
  email: z.string().email('Correo electrónico inválido'),
})

type Schema = z.output<typeof schema>

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Correo electrónico',
    placeholder: 'correo@ejemplo.com',
    required: true,
  },
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await sendResetEmail(event.data.email)
}
</script>

<template>
<UAuthForm
  :schema="schema"
  :fields="fields"
  title="Recuperar contraseña"
  icon="i-lucide-mail"
  :loading="loading"
  :submit="{ label: 'Enviar enlace', block: true, size: 'lg' }"
  @submit="onSubmit"
>
  <!-- Descripción + explicación del flujo -->
  <template #description>
    <p class="text-sm text-muted mb-3">
      Ingresa tu correo y te enviaremos un enlace seguro para cambiar tu contraseña.
    </p>

    <div
      class="rounded-lg border border-muted/40 bg-muted/20 p-4 text-sm transition-all"
    >
      <div class="flex items-center gap-2 font-medium">
        <UIcon
          :name="success ? 'i-lucide-mail-check' : 'i-lucide-info'"
          class="w-4 h-4 text-primary"
        />
        <span>
          {{ success ? 'Correo enviado' : 'Cómo funciona el restablecimiento' }}
        </span>
      </div>

      <ul
        v-if="!success"
        class="mt-2 space-y-1.5 text-muted-foreground list-disc list-inside"
      >
        <li>Te enviaremos un <strong>enlace de un solo uso</strong></li>
        <li>Debes abrirlo en <strong>este mismo navegador</strong></li>
        <li>El enlace <strong>expira en 60 minutos</strong></li>
      </ul>

      <p v-else class="mt-2 text-muted-foreground">
        Revisa tu correo y abre el enlace desde este navegador antes de que expire.
      </p>
    </div>
  </template>

  <!-- Mensajes de éxito/error -->
  <template v-if="error || success" #validation>
    <UAlert v-if="error" color="error" :title="error" :close="true"/>
    <UAlert v-if="success" color="success" :title="success" />
  </template>

  <!-- Footer -->
  <template #footer>
    <div class="text-center">
      <USeparator />
      <UButton
        variant="link"
        color="neutral"
        :to="{ name: 'auth-login' }"
        class="mt-2"
      >
        Volver al login
      </UButton>
    </div>
  </template>
</UAuthForm>

</template>
