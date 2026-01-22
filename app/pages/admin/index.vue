<script setup lang="ts">
import { useAdminDashboardQuery } from '~/composables/admin/dashboard/queries/useAdminDashboardQuery'
import { useAdminDashboardView } from '~/composables/admin/dashboard/views/useAdminDashboardView'

definePageMeta({
  title: 'Dashboard',
  layout: 'admin',
  name: 'admin-dashboard',
  middleware: 'admin-auth',
})

const { data, pending, error } = useAdminDashboardQuery()

const dashboard = computed(() =>
  useAdminDashboardView(data.value ?? [])
)
</script>

<template>
  <div>
  <ClientOnly>
    <div class="space-y-8">

      <!-- 🔄 LOADING -->
      <div
        v-if="pending"
        class="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <UCard v-for="i in 3" :key="i">
          <USkeleton class="h-4 w-24 mb-2" />
          <USkeleton class="h-8 w-16" />
        </UCard>
      </div>

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
    </ClientOnly>
  </div>
</template>
