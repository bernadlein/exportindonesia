<script setup lang="ts">
const isDark = useState('isDark', () => false)

onMounted(() => {
  const el = document.documentElement
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') el.classList.add('dark')
  isDark.value = el.classList.contains('dark')
})
const toggle = () => {
  const el = document.documentElement
  el.classList.toggle('dark')
  isDark.value = el.classList.contains('dark')
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
</script>

<template>
  <button class="btn-outline text-xs" @click="toggle" aria-label="Toggle theme">
    <span v-if="!isDark">🌙 Dark</span>
    <span v-else>☀️ Light</span>
  </button>
</template>
