<!-- app/components/admin/projects/ProjectTagsInput.vue -->
<script setup lang="ts">
const props = defineProps<{
  modelValue: string[]
  suggestedTags?: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const suggestions = computed(() =>
  props.suggestedTags ?? []
)

const customTags = computed(() =>
  props.modelValue.filter(tag => !suggestions.value.includes(tag))
)

const addTag = (tag: string) => {
  const normalized = tag.trim().toLowerCase()
  if (!normalized) return
  if (props.modelValue.includes(normalized)) return

  emit('update:modelValue', [...props.modelValue, normalized])
}

const removeTag = (tag: string) => {
  emit(
    'update:modelValue',
    props.modelValue.filter(t => t !== tag)
  )
}
</script>

<template>
  <div class="space-y-3">
    <!-- Input con tags integrado -->
    <UInputTags
      :model-value="modelValue"
      size="lg"
      placeholder="Add tags and press Enter"
      icon="i-lucide-tag"
      @update:model-value="emit('update:modelValue', $event)"
    />

    <!-- Suggested tags -->
    <div v-if="suggestions.length" class="space-y-1">
      <p class="text-xs text-gray-500 dark:text-gray-400">Suggested tags</p>
      <div class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in suggestions"
          :key="tag"
          :color="modelValue.includes(tag) ? 'primary' : 'secondary'"
          variant="soft"
          class="cursor-pointer"
          @click="addTag(tag)"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <!-- Info for custom tags -->
    <UAlert
      v-if="customTags.length"
      color="info"
      variant="soft"
      icon="i-lucide-info"
      title="Custom tags"
      :description="`You added ${customTags.length} custom tag(s). Make sure they are consistent and meaningful.`"
    />
  </div>
</template>
