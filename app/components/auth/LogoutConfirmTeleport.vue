<!-- app/components/auth/LogoutConfirmTeleport.vue -->
 <template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-black/50"
        @click="close"
      />

      <!-- Modal -->
      <div
        class="relative z-10 w-full max-w-sm rounded-lg bg-white dark:bg-neutral-900 shadow-lg p-5"
      >
        <h3 class="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Cerrar sesión
        </h3>

        <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          ¿Estás seguro de que deseas cerrar sesión?
        </p>

        <div class="mt-5 flex justify-end gap-2">
          <UButton
            variant="ghost"
            color="neutral"
            @click="close"
          >
            Cancelar
          </UButton>

          <UButton
            color="error"
            :loading="loading"
            @click="confirm"
          >
            Cerrar sesión
          </UButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
}>()

const close = () => emit('update:open', false)
const confirm = () => emit('confirm')
</script>
