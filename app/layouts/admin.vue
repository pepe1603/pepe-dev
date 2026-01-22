<!-- app/layouts/admin.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'

// ✅ Definir props que puede recibir el layout
interface Props {
  title?: string
  description?: string
}

const props = defineProps<Props>()

const adminNavigation: NavigationMenuItem[] = [
  { label: 'Perfil', icon: 'i-lucide-user', to: '/admin/profile' },
  { label: 'Proyectos', icon: 'i-lucide-folder-kanban', to: '/admin/projects' },
  { label: 'Tecnologias', icon: 'i-lucide-microchip', to: '/admin/technologies' },
  { label: 'Experiencia', icon: 'i-lucide-briefcase', to: '/admin/experiences' },
  { label: 'Skills', icon: 'i-lucide-star', to: '/admin/skills' }
]

const sidebarOpen = ref(false)

// ✅ Usar props directamente (más simple y reactivo)
const pageTitle = computed(() => props.title)
const pageDescription = computed(() => props.description)
</script>

<template>
  <UDashboardGroup class="min-h-screen bg-neutral-50 dark:bg-neutral-950">

    <!-- SIDEBAR -->
    <UDashboardSidebar
      id="admin-sidebar"
      v-model:open="sidebarOpen"
      mode="drawer"
      collapsible
    >
      <template #header="{ collapsed }">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-layout-dashboard" class="w-5 h-5 text-primary" />
          <span
            v-if="!collapsed"
            class="text-sm font-semibold tracking-tight"
          >
            Admin
          </span>
        </div>
      </template>

      <UNavigationMenu
        :items="adminNavigation"
        orientation="vertical"
      />

      <template #footer="{ collapsed }">
        <UButton
          :label="collapsed ? undefined : 'Cerrar sesión'"
          variant="ghost"
          color="neutral"
          icon="i-lucide-log-out"
          class="w-full text-red-600 dark:text-red-400 inline-flex space-x-2 text-center justify-center"
          :block="collapsed"
          size="xs"
        />
      </template>
    </UDashboardSidebar>

    <!-- MAIN -->
    <UDashboardPanel class="">

      <!-- GLOBAL NAVBAR -->
      <template #header>
        <UDashboardNavbar :ui="{root: 'border-none'}" >
          <template #right>
            <UColorModeButton />
            <UAvatar
              size="sm"
              src="https://www.flaticon.com/free-icon/person_10412383?term=profile+placeholder&page=1&position=1&origin=search&related_id=10412383"
              alt="Admin"
            />
            
          </template>
          <template #toggle>
            <UDashboardSidebarToggle 
              :icon="sidebarOpen ? 'i-lucide-panel-left-close' : 'i-lucide-panel-left-open'"
              color="primary"
              variant="link"
              class="hover:animate-pulse"
            />
          </template>
        </UDashboardNavbar>
      </template>

      <!-- CONTENT -->
      <template #body>
        <div class="space-y-3">
                    <!-- PAGE HEADER -->
                <div
                  v-if="pageTitle || pageDescription"
                  class="flex items-start justify-between gap-6"
                >
                  <div class="space-y-2 md:space-y-4">
                    <h1
                      v-if="pageTitle"
                      class="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100"
                    >
                      {{ pageTitle }}
                    </h1>

                    <p
                      v-if="pageDescription"
                      class="text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      {{ pageDescription }}
                    </p>
                  </div>

                  <!-- Acciones por página (opcional) -->
                  <div
                    v-if="$slots['page-actions']"
                    class="flex items-center gap-2"
                  >
                    <slot name="page-actions" />
                  </div>

                </div>

                <slot />
        </div>
      </template>

    </UDashboardPanel>

  </UDashboardGroup>
</template>
