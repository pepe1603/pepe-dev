<!-- app/components/admin/skills/SkillCategoryTaghsInput.vue -->

<script setup lang="ts" name="SkillCategoryTagsInput">
const props = defineProps<{
  modelValue: string | null
  suggestions: readonly string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const selectCategory = (value: string) => {
  emit('update:modelValue', value)
}

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value.trim()
  emit('update:modelValue', value || null)
}
</script>

<template>
  <div class="space-y-3">
    <!-- Input libre -->
    <UInput
      :model-value="modelValue ?? ''"
      placeholder="Select or write a category"
      size="lg"
      @input="onInput"
    />

    <!-- Sugerencias -->
    <div class="flex flex-wrap gap-2">
      <UButton
        v-for="suggestion in suggestions"
        :key="suggestion"
        size="xs"
        variant="soft"
        :color="modelValue === suggestion ? 'primary' : 'neutral'"
        @click="selectCategory(suggestion)"
      >
        {{ suggestion }}
      </UButton>
    </div>
  </div>
</template>
