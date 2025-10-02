<script setup lang="ts">
defineProps<{ variant?: 'primary'|'outline'|'ghost'; as?: string }>()
const tag = computed(() => (useAttrs().to ? 'NuxtLink' : (useAttrs().href ? 'a' : 'button')))
</script>

<template>
  <component :is="tag" v-bind="$attrs"
    :class="[
      variant==='outline' ? 'btn-outline' :
      variant==='ghost' ? 'btn' :
      'btn-primary'
    ]">
    <slot />
  </component>
</template>
