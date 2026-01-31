<!-- app/layouts/admin.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'
import LogoutButton from '~/components/auth/LogoutButton.vue';
import { usePublicProfileCase } from '~/composables/public/usecases/usePublicProfileUseCase';

// ✅ Definir props que puede recibir el layout
interface Props {
  title?: string
  description?: string
}
const props = defineProps<Props>()

  // Ejecuta el caso de uso
const { data: profile, pending } = usePublicProfileCase()

const shortHeadline = computed(() => {
  if (!profile.value?.headline) return 'Administrador'
  const maxLength = 25 // número máximo de caracteres
  return profile.value.headline.length > maxLength
    ? profile.value.headline.slice(0, maxLength) + '…'
    : profile.value.headline
})

const githubLink = computed(() => {
  if (!profile?.value?.links) return null
  return profile.value.links.find(p => p.type === 'github')?.url ?? null
})

const adminNavigation: NavigationMenuItem[] = [
  { label: 'Dashboard', icon: 'i-lucide-layout-grid', to: '/admin' },
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
        <div class="w-full flex items-center justify-center gap-2 ">
          <!-- <UIcon name="i-lucide-layout-dashboard" class="w-5 h-5" /> -->
          <span
            v-if="!collapsed"
            class="text-sm md:text-lg lg:text-xl font-extrabold tracking-tight text-primary"
          >
            Admin Panel
          </span>
        </div>
      </template>

      <UNavigationMenu
        :items="adminNavigation"
        orientation="vertical"
      />

      <template #footer="{ collapsed }">
        <LogoutButton
        class="mx-auto"
          :collapsed="collapsed"
          confirm
        />
      </template>
    </UDashboardSidebar>

    <!-- MAIN -->
    <UDashboardPanel>

      <!-- GLOBAL NAVBAR -->
      <template #header>
        <UDashboardNavbar :ui="{root: 'border-none'}" >
          <template #right>
            <UUser
              v-if="!pending && profile"
              :to="githubLink"
              target="_blank"
              :name="profile.name"
              :description="shortHeadline"
              :avatar="{ src: profile.avatar }"
              size="sm"
            />

            <UUser
              v-else
              name="Cargando..."
              description="..."
              :avatar="{ src: '' }"
              size="sm"
            />


            <UColorModeButton size="xs" variant="link" class="hover:text-primary" />
            <UButton
              to="/"
              target="_blank"
              variant="ghost"
              color="neutral"
              icon="i-lucide-external-link"
              size="xs"
              label="Ver sitio"
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
                  class="flex items-start justify-between gap-4 mb-4"
                >
                  <div class="space-y-1 md:space-y-2.5">
                    <h1
                      v-if="pageTitle"
                      class="text-2xl md:text-3xl font-bold"                    >
                      {{ pageTitle }}
                    </h1>

                    <p
                      v-if="pageDescription"
                      class="text-sm"
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
