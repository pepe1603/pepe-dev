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
    <UHeader class="bg-cyan-50 dark:bg-cyan-900/25 text-current border-b border-gray-200 dark:border-gray-800">
      <template #left>
        <ULink to="/" class="flex items-center">
          <UIcon name="i-lucide-rocket" class="w-6 h-6 text-primary-500" />
          <span class="text-xl font-bold ml-2">Pepe.dev</span>
        </ULink>
      </template>

      <!-- Los links van en el slot default, usando UNavigationMenu -->
      <UNavigationMenu :items="publicLinks" variant="link" />

      <template #right>
        <UColorModeButton class="rounded-full" color="primary" />
      </template>

      <!-- Para mobile, usa el slot body -->
      <template #body>
        <UNavigationMenu :items="publicLinks" orientation="vertical" class="-mx-2.5" />
      </template>
    </UHeader>

    <!-- Contenido principal -->
    <UMain class="py-6 px-4">
      <slot />
    </UMain>

    <!-- Footer -->
    <UFooter class="flex justify-center items-center py-2 border-t border-neutral-200 dark:border-neutral-800 mt-auto">
      <template #left>
        <p class="text-sm text-neutral-500">© {{ year }} Pepe.dev</p>
        <UButton variant="ghost" color="secondary" label="Authenticacion" :to="{name: 'auth-home'}" />
      </template>
    </UFooter>
  </div>
</template>
