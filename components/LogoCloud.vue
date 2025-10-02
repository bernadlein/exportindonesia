<template>
  <div class="grid grid-cols-3 md:grid-cols-6 gap-6 opacity-70">
    <img v-for="i in 6" :key="i" class="h-8 object-contain mx-auto"
         :src="`https://placehold.co/160x32?text=Logo+${i}`" :alt="`Client ${i}`">
  </div>
</template>
