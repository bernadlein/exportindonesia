<script setup lang="ts">
defineProps<{ class?: string }>()
</script>
<template><div :class="['animate-pulse rounded-xl bg-slate-200/60', $props.class]"/></template>
