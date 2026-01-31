<!-- //app/pages/admin/index.vue -->
<script setup lang="ts">
import PageLoader from '~/components/common/PageLoader.vue'
import { useAdminDashboardQuery } from '~/composables/admin/dashboard/queries/useAdminDashboardQuery'
import { useAdminDashboardView } from '~/composables/admin/dashboard/views/useAdminDashboardView'

definePageMeta({
  title: 'Dashboard',
  layout: false,
  name: 'admin-dashboard',
  // middleware: 'admin-auth',
})

const { data, pending, error } = useAdminDashboardQuery()

const dashboard = computed(() =>
  useAdminDashboardView(data.value ?? [])
)
</script>

<template>
  <div>
    <NuxtLayout 
    name="admin"
    title="Dashboard"
    description="Vista general del estado de tu contenido, proyectos y actividad reciente."
    >
      <div class="space-y-8">

      <!-- 🔄 LOADING -->
      <!-- <PageLoader
        v-if="pending"
        type="skeleton"
      > -->
      <PageLoader v-if="pending ?? true" type="skeleton">
        <section class="text-center space-y-6">
          <!-- Title -->
          <div class="space-y-3">
            <USkeleton class="h-10 md:h-14 lg:h-16 w-64 mx-auto" />
            <USkeleton class="h-6 w-80 mx-auto" />
          </div>
            <!-- Cards items -->
            <div class="m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-start">
              <UCard
                  v-for="card in 4"
                  :key="card"
                  class="p-5 space-y-3 h-48 w-full"
                >
                          <div class="space-y-3">

              <div class="flex items-center justify-between">
                <USkeleton class="h-4 w-3/5" />
                <USkeleton class="size-8 rounded-full" />
              </div>

              <USkeleton class="h-2 w-full" />

              <div class="flex gap-4 text-sm text-muted">
                <USkeleton class="h-2 w-5/6 mx-auto" />
                <USkeleton class="h-2 w-5/6 mx-auto" />
              </div>

              <USkeleton class="h-2 w-4 rounded-xl" />

            </div>
            </UCard>
          </div>

          
        </section>
      </PageLoader>



      <!-- ❌ ERROR -->
      <UAlert
        v-else-if="error"
        color="error"
        icon="i-lucide-alert-circle"
        title="Error"
        description="No se pudo cargar el dashboard"
      />

      <!-- 📭 EMPTY -->
      <UEmpty
        v-else-if="!dashboard.length"
        title="Dashboard vacío"
        description="Aún no hay contenido"
        icon="i-lucide-layout-dashboard"
      />

      <!-- ✅ DATA -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <UCard
          v-for="entity in dashboard"
          :key="entity.entity"
        >
          <div class="space-y-3">

            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-muted">
                {{ entity.label }}
              </h3>
              <UIcon
                name="i-lucide-database"
                class="w-5 h-5 text-primary"
              />
            </div>

            <p class="text-3xl font-semibold">
              {{ entity.total }}
            </p>

            <div class="flex gap-4 text-sm text-muted">
              <span>✔ {{ entity.published }} publicados</span>
              <span>✎ {{ entity.drafts }} drafts</span>
            </div>

            <!-- Últimos drafts -->
            <div v-if="entity.lastDrafts.length" class="pt-2 space-y-1">
              <p class="text-xs uppercase text-muted">
                Últimos borradores
              </p>
              <ul class="text-sm space-y-1">
                <li
                  v-for="draft in entity.lastDrafts"
                  :key="draft.id"
                  class="truncate"
                >
                  • {{ draft.title }}
                </li>
              </ul>
            </div>

          </div>
        </UCard>
      </div>

    </div>
    </NuxtLayout>
  </div>
</template>
