<template>
    <UContainer class="py-10 flex flex-col gap-4 font-sans">
    <UCard>
      <template #header>
        <h1 class="text-3xl font-bold text-primary-500 tracking-tight">
          Pepe Dev Portfolio
        </h1>
        <p class="text-neutral-500 font-mono text-sm">/home/pepe-dev</p>
      </template>
      
      <div class="flex gap-3">
        <UButton 
          color="primary" 
          icon="i-lucide-rocket" 
          size="lg"
        >
          Explorar Proyectos
        </UButton>
        
        <UButton 
          color="secondary" 
          variant="ghost" 
          icon="i-lucide-github"
        >
          GitHub
        </UButton>
      </div>
      
      <div class="mt-6 flex gap-4">
        <UBadge color="success" variant="subtle" class="font-mono">
          ● Status: Online
        </UBadge>
        <UBadge color="info" variant="outline" class="font-mono">
          v4.2.2
        </UBadge>
      </div>
    </UCard>
  </UContainer>
  <UContainer class="py-10 flex flex-col gap-4 font-sans">
    <UCard>
      <template #header>
        <h1 class="text-3xl font-bold text-primary-500 tracking-tight">
          Pepe Dev Portfolio
        </h1>
        <p class="text-neutral-500 font-mono text-sm">/home/pepe-dev</p>
      </template>

      <div class="flex gap-3">
        <UButton
          color="primary"
          icon="i-lucide-rocket"
          size="lg"
          @click="testConnection"
        >
          Test Supabase Connection
        </UButton>

        <UButton
          color="secondary"
          variant="ghost"
          icon="i-lucide-github"
          @click="viewGitHub"
        >
          GitHub
        </UButton>
      </div>

      <div v-if="message" class="mt-4 p-4 bg-gray-100 rounded-lg text-black">
        <p class="font-mono text-sm">{{ message }}</p>
      </div>

      <!-- Mostrar datos si existen -->
      <div v-if="profile" class="mt-6">
        <h3 class="text-lg font-semibold">Perfil:</h3>
        <p>{{ profile.full_name }} - {{ profile.headline }}</p>
      </div>

      <div class="mt-6 flex gap-4">
        <UBadge color="success" variant="subtle" class="font-mono">
          ● Status: {{ status }}
        </UBadge>
        <UBadge color="info" variant="outline" class="font-mono">
          v4.2.2
        </UBadge>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { useProfile, useProjects, useExperiences, useSkills } from '~/composables';

const status = ref('Online')
const message = ref('')
const profile = ref(null)
const projects = ref([])
const experiences = ref([])
const skills = ref([])

const { getPublicProfile } = useProfile()
const { fetchPublicProjects } = useProjects()
const { fetchPublicExperiences } = useExperiences()
const { fetchPublicSkills } = useSkills()

const testConnection = async () => {
  try {
    message.value = '🔌 Conectando a Supabase...'
    status.value = 'Connecting'

    // Test 1: Obtener perfil público
    const profileData = await getPublicProfile()
    if (profileData) {
      profile.value = profileData
      message.value = `✅ Perfil cargado: ${profileData.full_name}`
    }

    // Test 2: Obtener proyectos
    const projectsData = await fetchPublicProjects({ limit: 3 })
    projects.value = projectsData
    message.value += ` | ${projectsData.length} proyectos`

    // Test 3: Obtener experiencias
    const experiencesData = await fetchPublicExperiences({ limit: 2 })
    experiences.value = experiencesData
    message.value += ` | ${experiencesData.length} experiencias`

    // Test 4: Obtener habilidades
    const skillsData = await fetchPublicSkills()
    skills.value = skillsData
    message.value += ` | ${skillsData.length} habilidades`

    status.value = 'Connected'
    
  } catch (error: any) {
    message.value = `❌ Error: ${error.message}`
    status.value = 'Error'
  }
}

const viewGitHub = () => {
  window.open('https://github.com', '_blank')
}
</script>