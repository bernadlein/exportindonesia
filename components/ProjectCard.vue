<script setup lang="ts">
defineProps<{ item: { img:string; title:string; desc:string } }>()
</script>
<template>
  <article class="card overflow-hidden">
    <img 
      :src="item.img" 
      :alt="item.title" 
      loading="lazy"
      class="h-40 w-full object-cover">
    <div class="p-4">
      <h4 class="font-semibold">{{ item.title }}</h4>
      <p class="text-sm text-slate-600 mt-1">{{ item.desc }}</p>
    </div>
  </article>
</template>
