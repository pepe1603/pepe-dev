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
</template>