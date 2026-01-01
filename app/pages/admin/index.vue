<!-- app/pages/admin/index.vue -->
<script setup lang="ts">
// Admin Dashboard (empty state)
// Sin lógica
// Sin datos
// Sin queries

definePageMeta({
  //Definimos el layout explicitamente
  layout: false,
  title: 'Dashboard',
  name: 'dashboard-home',
  description: 'Vista general del estado de tu perfil y proyectos.',
  middleware: 'admin-auth',
})
</script>

<template>
  <NuxtLayout name="admin">
    <!-- PAGE ACTIONS -->
    <template #page-actions>
      <UButton
        color="primary"
        variant="soft"
        icon="i-lucide-plus"
      >
        Acción fake
      </UButton>
    </template>

    <!-- PAGE CONTENT -->
    <div class="space-y-8">

      <!-- Empty State -->
      <UCard
        class="border-dashed border-neutral-300 dark:border-neutral-700"
      >
        <div
          class="flex flex-col items-center justify-center
                text-center py-16 px-6 gap-4"
        >
          <UIcon
            name="i-lucide-layout-dashboard"
            class="w-12 h-12 text-neutral-400"
          />

          <div class="space-y-1">
            <h3 class="text-lg font-medium">
              Dashboard listo
            </h3>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
              Desde aquí podrás gestionar tu perfil, proyectos, experiencia y skills.
              Cuando empecemos a conectar datos, este panel mostrará métricas y accesos rápidos.
            </p>
          </div>

          <div class="flex gap-3 pt-4">
            <UButton
              variant="soft"
              color="primary"
              icon="i-lucide-user"
            >
              Editar perfil
            </UButton>

            <UButton
              variant="ghost"
              color="neutral"
              icon="i-lucide-folder-kanban"
            >
              Ver proyectos
            </UButton>
          </div>
        </div>
      </UCard>

      <!-- Placeholder Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard>
          <p class="text-sm text-neutral-500">Perfil</p>
          <p class="text-2xl font-semibold mt-2">—</p>
        </UCard>

        <UCard>
          <p class="text-sm text-neutral-500">Proyectos</p>
          <p class="text-2xl font-semibold mt-2">—</p>
        </UCard>

        <UCard>
          <p class="text-sm text-neutral-500">Skills</p>
          <p class="text-2xl font-semibold mt-2">—</p>
        </UCard>
      </div>

    </div>

  </NuxtLayout>
</template>