<!-- app/components/auth/LogoutButton.vue -->
<template>
  <div>
    <UButton
      :label="collapsed ? undefined : 'Cerrar sesión'"
      variant="ghost"
      color="neutral"
      icon="i-lucide-log-out"
      :class="[
        'w-full justify-start',
        collapsed ? 'justify-center' : '',
        'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
        'hover:bg-red-50 dark:hover:bg-red-950/20'
      ]"
      size="sm"
      :loading="loadingLogout"
      @click="handleClick"
    />

    <LogoutConfirmTeleport
      v-if="confirm"
      v-model:open="open"
      :loading="loadingLogout"
      @confirm="handleLogout"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthLogoutUseCase } from '~/composables/auth/usecases/useAuthLogoutUseCase'
import LogoutConfirmTeleport from './LogoutConfirmTeleport.vue'

const props = defineProps<{
  collapsed?: boolean
  confirm?: boolean
}>()

const open = ref(false)
const { logout, loadingLogout } = useAuthLogoutUseCase()

const handleClick = () => {
  if (props.confirm) {
    open.value = true
  } else {
    handleLogout()
  }
}

const handleLogout = async () => {
  await logout()
  open.value = false
}
</script>
