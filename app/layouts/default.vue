<!-- /app/layouts/default.vue -->
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const publicLinks = computed<NavigationMenuItem[]>(() => [{
  label: 'Inicio',
  //icon: 'i-lucide-home',
  to: '/',
  active: route.path === '/'
}, {
  label: 'Proyectos',
  //icon: 'i-lucide-user-check',
  to: { name: 'projects' },
  active: route.name === 'projects'
}, {
  label: 'Acerca de mi',
  //icon: 'i-lucide-map-pinned',
  to: { name: 'about-me' },
  active: route.name === 'about-me'
}])

const year = new Date().getFullYear()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header público -->
    <UHeader class="bg-transparent border-b border-gray-200 dark:border-gray-800">
      <template #left>
        <UButton to="/" variant="link" color="neutral" class="flex items-center">
          <UIcon name="i-lucide-rocket" class="w-6 h-6" />
          <span class="text-xl font-bold ml-2">Pepe.dev</span>
        </UButton>
      </template>

      <!-- Los links van en el slot default, usando UNavigationMenu -->
      <UNavigationMenu :items="publicLinks" variant="link" color="neutral" />

      <template #right>
        <UColorModeButton class="rounded-full" size="xs" color="primary" />
      </template>

      <!-- Para mobile, usa el slot body -->
      <template #body>
        <UNavigationMenu :items="publicLinks" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

    <!-- Contenido principal -->
    <UMain class="py-2.5 px-4 mt-16">
      <slot />
    </UMain>

    <!-- Footer -->
    <UFooter class="flex justify-center items-center py-2 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
      <template #left>
        <p class="text-sm text-muted">{{ year }}</p>
        <!-- <UButton variant="ghost" color="secondary" label="Authenticacion" :to="{name: 'auth-home'}" /> -->
         <span class="hidden sm:inline text-xs text-neutral-500 ml-2">⌘+K para acceder al CPanel</span>
      </template>
    </UFooter>
  </div>
</template>
