<script setup lang="ts">
const isDark = useState('isDark', () => false)
onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
const toggle = () => {
  const el = document.documentElement
  el.classList.toggle('dark')
  isDark.value = el.classList.contains('dark')
  if (process.client) localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') document.documentElement.classList.add('dark')
})
</script>

<template>
  <button class="btn-outline text-xs" @click="toggle">
    <span v-if="!isDark">🌙 Dark</span>
    <span v-else>☀️ Light</span>
  </button>
</template>
