//app/composables/admin/projects/media_project/useSortableProjectMedia.ts

import { ref, watch, computed } from 'vue'
import { useProjectMediaUseCases } from './usecases/useProjectMediaUseCases'
import type { ProjectMediaItemModel } from './models/ProjectMediaItemModel'



export const useSortableProjectMedia = (
  source: Ref<ProjectMediaItemModel[]>
) => {
  const { updateMediaOrder } = useProjectMediaUseCases()
  const toast = useToast()
  const items = ref<ProjectMediaItemModel[]>([])
  const snapshot = ref<ProjectMediaItemModel[]>([])
  const isSorting = ref(false)
  const isPersisting = ref(false)

  // ⬇️ CORRECCIÓN: Mantén la reactividad sin romper la referencia
  watch(source, value => {
    if (!isSorting.value) { // ⬅️ Solo actualiza si NO estás ordenando
      items.value = [...value].sort((a, b) => a.sortOrder - b.sortOrder)
    }
  }, { immediate: true })

  const startSorting = () => {
    snapshot.value = items.value.map(i => ({ ...i }))
    isSorting.value = true
  }

  const cancelSorting = () => {
    items.value = snapshot.value.map(i => ({ ...i }))
    isSorting.value = false
  }

  const saveSorting = async () => {
    isPersisting.value = true
    try {
      await updateMediaOrder(
        items.value.map((item, index) => ({
          id: item.id,
          sortOrder: index,
        }))
      )
      toast.add({ title: 'Orden guardado', color: 'success' })
      isSorting.value = false
    } catch (e: any) {
      cancelSorting()
      toast.add({ title: 'Error al guardar orden', color: 'error' })
    } finally {
      isPersisting.value = false
    }
  }

  const hasChanges = computed(() =>
    snapshot.value.some(
      (item, index) => item.id !== items.value[index]?.id
    )
  )

  return {
    items,
    isSorting,
    isPersisting,
    hasChanges,
    startSorting,
    cancelSorting,
    saveSorting,
  }
}
