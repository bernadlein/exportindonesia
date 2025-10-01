
<script setup lang="ts">
const year = new Date().getFullYear()
const config = useRuntimeConfig()
</script>
<template>
  <footer class="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
    © {{ year }} {{ config.public.company }} — Demo
  </footer>
</template>
