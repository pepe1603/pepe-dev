<!-- app/pages/auth/login.vue -->
<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useAuthLoginUseCase } from '~/composables/auth/usecases/useAuthLoginUseCase'

definePageMeta({
  layout: 'auth',
  title: 'Iniciar sesión',
  name: 'auth-login',
})

const toast = useToast();
const showPassword = ref(false);

const form = reactive({
  email: '',
  password: '',
})

const { login, loading, error: _error } = useAuthLoginUseCase()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
const submitError = ref<string | null>(null)

const onSubmit = async () => {
  submitError.value = null

  const { error } = await login({
    email: form.email,
    password: form.password,
  })

  if (error) {
    submitError.value =
      error.message ?? 'Credenciales inválidas'
      toast.add({
    title: 'Login Error',
    description:
      'Upps!, algo fallo, Revisa tus credenciales.',
    icon: 'i-lucide-shield-x',
    color: 'error',
  })
  }else{
    toast.add({
    title: 'Login success',
    description:
      'Bienvenido, Es un gussto tenerte de vuelta!.',
    icon: 'i-lucide-shield-check',
    color: 'success',
  })
  }
}

const showRestrictedAccessInfo = () => {
  toast.clear()
  toast.add({
    title: 'Acceso restringido',
    description:
      'Por razones de seguridad, el registro público no está disponible. El acceso está reservado únicamente para la administración del portafolio.',
    icon: 'i-lucide-lock',
    color: 'secondary',
  })
}


/**
 * Limpia el error cuando el usuario vuelve a escribir
 */
watch(
  () => [form.email, form.password],
  () => {
    submitError.value = null
  }
)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <header class="text-center space-y-1">
      <h2 class="text-2xl font-semibold">
        Iniciar sesión
      </h2>
      <p class="text-muted">
        Accede con tus credenciales
      </p>
    </header>

    <!-- Error -->
    <UAlert
      v-if="submitError"
      color="error"
      variant="soft"
      icon="i-lucide-alert-triangle"
      description="Error"
      :title="submitError"
    />

    <!-- Form -->
    <UForm
      :state="form"
      class="space-y-4"
      @submit.prevent="onSubmit"
    >
      <UFormField  label="Correo electrónico" name="email">
        <UInput
          v-model="form.email"
          type="email"
          placeholder="correo@ejemplo.com"
          autocomplete="email"
          class="w-full"
          required
        />
      </UFormField>

      <UFormField label="Contraseña" name="password">
      <UInput
        v-model="form.password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="••••••••"
        autocomplete="current-password"
        class="w-full"
        required
      >
        <template #trailing>
          <UButton
            :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
            variant="ghost"
            color="secondary"
            size="xs"
            :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            tabindex="-1"
            @click="togglePassword"
          />
        </template>
      </UInput>
    </UFormField>


      <UButton
      class="mt-2"
        type="submit"
        size="lg"
        block
        :loading="loading"
        :disabled="loading"
      >
        Iniciar sesión
      </UButton>

      <div class="flex flex-col items-center justify-between text-sm">
        <UButton
          variant="link"
          color="primary"
          size="sm"
          to="/auth/forgot-password"
          :disabled="loading"

        >
          ¿Olvidaste tu contraseña?
        </UButton>

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

        <p class="text-xs text-muted text-center">
          El inicio de sesión está habilitado únicamente para fines administrativos.
        </p>


      </div>

    </UForm>
  </div>
</template>
