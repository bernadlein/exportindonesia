<script setup lang="ts">
defineProps<{ error: any }>()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <section class="section">
    <div class="max-w-xl mx-auto text-center">
      <h1 class="text-3xl font-extrabold">Oops!</h1>
      <p class="mt-2 text-slate-600">Something went wrong.</p>
      <p class="mt-2 text-xs text-slate-500">{{ error?.statusCode }} – {{ error?.message }}</p>
      <div class="mt-6">
        <ui-button @click="handleError">Back to Home</ui-button>
      </div>
    </div>
  </section>
</template>
