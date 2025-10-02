<script setup lang="ts">
// 3-mode theme switcher: 'auto' | 'light' | 'dark'
type ThemeMode = 'auto' | 'light' | 'dark'

const open = ref(false)
const mode = useState<ThemeMode>('themeMode', () => 'auto')
const isDark = useState('isDark', () => false)

let mql: MediaQueryList | null = null

const applyTheme = (m: ThemeMode) => {
  // simak preferensi sistem hanya jika 'auto'
  const prefersDark = mql?.matches ?? window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = m === 'dark' || (m === 'auto' && prefersDark)
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', m)
  mode.value = m
  isDark.value = dark
}

onMounted(() => {
  // inisialisasi dari localStorage
  const saved = (localStorage.getItem('theme') as ThemeMode) || 'auto'
  mql = window.matchMedia('(prefers-color-scheme: dark)')
  applyTheme(saved)

  // bila sistem berubah & mode kita 'auto', ikuti sistem
  const listener = (e: MediaQueryListEvent) => {
    if (mode.value === 'auto') applyTheme('auto')
  }
  mql.addEventListener?.('change', listener)

  // shortcut keyboard: Shift + D
  const onKey = (e: KeyboardEvent) => {
    if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
      // cycle: auto -> dark -> light -> auto
      const next: Record<ThemeMode, ThemeMode> = { auto: 'dark', dark: 'light', light: 'auto' }
      applyTheme(next[mode.value])
    }
    if (e.key === 'Escape') open.value = false
  }
  document.addEventListener('keydown', onKey)

  // klik di luar menutup menu
  const onDoc = (e: MouseEvent) => {
    if (!(e.target as HTMLElement)?.closest?.('[data-theme-toggle]')) open.value = false
  }
  document.addEventListener('click', onDoc)

  onBeforeUnmount(() => {
    mql?.removeEventListener?.('change', listener)
    document.removeEventListener('keydown', onKey)
    document.removeEventListener('click', onDoc)
  })
})

const label = computed(() => {
  if (mode.value === 'dark') return 'Dark'
  if (mode.value === 'light') return 'Light'
  return 'Auto'
})
</script>

<template>
  <div class="relative" data-theme-toggle>
    <!-- Trigger -->
    <button
      class="btn-outline text-xs"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click.stop="open = !open"
      :title="`Theme: ${label}`"
    >
      <span v-if="mode==='dark'">☀️ Light</span>
      <span v-else-if="mode==='light'">🌙 Dark</span>
      <span v-else>🖥️ Auto</span>
    </button>

    <!-- Popover Menu -->
    <div
      v-show="open"
      class="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 bg-white shadow-2xl p-1 z-50
             dark:border-slate-700 dark:bg-slate-800"
      role="menu"
    >
      <button
        class="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
        :class="mode==='auto' ? 'font-semibold text-brand-700 dark:text-brand-300' : ''"
        role="menuitem"
        @click="applyTheme('auto'); open=false"
      >🖥️ Auto (follow system)</button>

      <button
        class="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
        :class="mode==='light' ? 'font-semibold text-brand-700 dark:text-brand-300' : ''"
        role="menuitem"
        @click="applyTheme('light'); open=false"
      >☀️ Light</button>

      <button
        class="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-700"
        :class="mode==='dark' ? 'font-semibold text-brand-700 dark:text-brand-300' : ''"
        role="menuitem"
        @click="applyTheme('dark'); open=false"
      >🌙 Dark</button>
    </div>
  </div>
</template>
