<script setup lang="ts" name="TechnologyForm">
import { reactive, watch, ref, computed } from 'vue'
import type { TechnologyFormModel } from '~/composables/admin/technologies/models/TechnologyFormModel'

const props = defineProps<{
  modelValue: TechnologyFormModel
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', value: TechnologyFormModel): void
  (e: 'cancel'): void
}>()

/* =====================
   COLOR CONFIG
===================== */
const colorMode = ref<'token' | 'hex'>('token')

const colorOptions = [
  { label: 'Neutral', value: 'neutral' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
  { label: 'Info', value: 'info' }
]

const isTokenColor = computed(() =>
  colorOptions.some(c => c.value === localForm.color)
)

// Estado temporal para el input hex
const hexInputValue = ref<string>('')

/* =====================
   FORM STATE
===================== */
const localForm = reactive<TechnologyFormModel>({
  id: undefined,
  name: '',
  description: null,
  icon: null,
  color: null,
  websiteUrl: null,
  status: 'draft'
})

watch(
  () => props.modelValue,
  value => {
    Object.assign(localForm, value)

    // Inferir modo al editar
    if (value.color?.startsWith('#')) {
      colorMode.value = 'hex'
      hexInputValue.value = value.color
    } else if (value.color) {
      colorMode.value = 'token'
    }
  },
  { immediate: true }
)

// Sincronizar input hex con color picker
watch(hexInputValue, (newVal) => {
  if (colorMode.value === 'hex' && newVal) {
    localForm.color = newVal
  }
})

// Sincronizar color picker con form
watch(() => localForm.color, (newVal) => {
  if (colorMode.value === 'hex' && newVal?.startsWith('#')) {
    hexInputValue.value = newVal
  }
})

// Limpiar o inicializar al cambiar de modo
watch(colorMode, (newMode) => {
  if (newMode === 'hex') {
    if (!localForm.color?.startsWith('#')) {
      localForm.color = '#000000'
      hexInputValue.value = '#000000'
    }
  } else {
    if (!colorOptions.some(c => c.value === localForm.color)) {
      localForm.color = null
    }
  }
})

const onSubmit = () => {
  emit('submit', { ...localForm })
}
</script>

<template>
  <UForm
    :state="localForm"
    class="space-y-6 border border-accented p-4 rounded-lg"
    @submit="onSubmit"
  >
    <!-- BASIC INFO -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">
          Technology Information
        </h2>
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UFormField label="Name" required class="w-full">
          <UInput v-model="localForm.name" size="lg" class="w-full" />
        </UFormField>

        <UFormField label="Icon" class="w-full">
          <UInput v-model="localForm.icon" size="lg" class="w-full" />
        </UFormField>

        <UFormField label="Description" class="w-full sm:col-span-2">
          <UTextarea v-model="localForm.description" :rows="3" size="lg" class="w-full" />
        </UFormField>
      </div>
    </UCard>

    <!-- APPEARANCE -->
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">
          Appearance & Links
        </h2>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- COLOR -->
        <UFormField label="Color" class="w-full md:col-span-2">
          <UTabs
            v-model="colorMode"
            :items="[
              { label: 'Token', value: 'token' },
              { label: 'Hex', value: 'hex' }
            ]"
            size="sm"
          />

          <div class="mt-4 space-y-3">
            <!-- Token Mode: Select con opciones predefinidas -->
            <template v-if="colorMode === 'token'">
              <USelect
                v-model="localForm.color"
                :items="colorOptions"
                size="lg"
                placeholder="Selecciona un color"
                class="w-full"
              >
                <template #item="{ item }">
                  <div class="flex items-center gap-2">
                    <span
                      class="size-3 rounded-full"
                      :class="`bg-${item.value}`"
                    />
                    <span>{{ item.label }}</span>
                  </div>
                </template>

                <template #leading>
                  <span
                    v-if="localForm.color && isTokenColor"
                    class="size-3 rounded-full"
                    :class="`bg-${localForm.color}`"
                  />
                </template>
              </USelect>

              <UAlert
                color="info"
                variant="soft"
                icon="i-lucide-info"
                title="Vista previa con tokens"
                description="Los badges de vista previa funcionan correctamente solo con colores token."
              />
            </template>

            <!-- Hex Mode: Input + Color Picker -->
            <template v-else>
              <div class="flex gap-2">
                <UInput
                  v-model="hexInputValue"
                  size="lg"
                  placeholder="#000000"
                  class="flex-1"
                >
                  <template #leading>
                    <span
                      class="size-4 rounded border border-gray-300"
                      :style="{ backgroundColor: hexInputValue || '#000000' }"
                    />
                  </template>
                </UInput>

                <UPopover>
                  <UButton
                    color="neutral"
                    variant="outline"
                    size="lg"
                    icon="i-lucide-pipette"
                    square
                  />

                  <template #content>
                    <UColorPicker
                      v-model="hexInputValue"
                      format="hex"
                      class="p-2"
                    />
                  </template>
                </UPopover>
              </div>

              <UAlert
                color="warning"
                variant="soft"
                icon="i-lucide-alert-triangle"
                title="Vista previa limitada"
                description="Los colores hexadecimales no se reflejarán en los badges de vista previa. Solo se mostrará el cuadrado de color."
              />
            </template>
          </div>
        </UFormField>

        <!-- PREVIEW -->
        <UFormField label="Preview" class="w-full md:col-span-2">
          <div class="flex items-center gap-3 flex-wrap">
            <UBadge
              :color="isTokenColor ? (localForm.color as any) : 'neutral'"
              variant="soft"
            >
              {{ localForm.name || 'Technology' }}
            </UBadge>
            
            <UBadge
              :color="isTokenColor ? (localForm.color as any) : 'neutral'"
              variant="soft"
              class="rounded-full p-1.5"
              square
            >
              UI
            </UBadge>

            <!-- Muestra el color personalizado cuando es hex -->
            <div
              v-if="localForm.color?.startsWith('#')"
              class="flex items-center gap-2"
            >
              <div
                class="size-8 rounded border-2 border-gray-200"
                :style="{ backgroundColor: localForm.color }"
              />
              <span class="text-sm text-gray-500">{{ localForm.color }}</span>
            </div>
          </div>
        </UFormField>

        <!-- URL -->
        <UFormField label="Website URL" class="w-full md:col-span-2">
          <UInput
            v-model="localForm.websiteUrl"
            type="url"
            size="lg"
            placeholder="https://example.com"
            class="w-full"
          />
        </UFormField>
      </div>
    </UCard>

    <!-- ACTIONS -->
    <div class="flex justify-end gap-3 pt-6 border-t border-accented">
      <UButton
        type="submit"
        color="primary"
        size="lg"
        :loading="loading"
        icon="i-lucide-save"
      >
        Save Technology
      </UButton>

      <UButton 
        variant="outline" 
        color="neutral" 
        size="lg" 
        @click="emit('cancel')"
      >
        Cancel
      </UButton>
    </div>
  </UForm>
</template>
