<template>
  <div class="oreui-scrollbar" :class="{ 'is-dragging': dragging }" :style="wrapperStyle">
    <div
      ref="viewport"
      class="oreui-scrollbar-viewport"
      :tabindex="tabIndex"
      @scroll="sync"
      @keydown="onKeydown"
    >
      <slot />
    </div>

    <div
      class="oreui-scrollbar-track oreui-scrollbar-track-vertical"
      :hidden="!hasVertical"
      :style="{ height: `${vTrackSize}px` }"
    >
      <div
        ref="vThumb"
        class="oreui-scrollbar-thumb oreui-scrollbar-thumb-vertical"
        aria-hidden="true"
        :style="vThumbStyle"
        @pointerdown="onThumbPointerDown($event, 'vertical')"
        @pointermove="onThumbPointerMove"
        @pointerup="onThumbPointerEnd"
        @pointercancel="onThumbPointerEnd"
      ></div>
    </div>

    <div
      class="oreui-scrollbar-track oreui-scrollbar-track-horizontal"
      :hidden="!hasHorizontal"
      :style="{ width: `${hTrackSize}px` }"
    >
      <div
        ref="hThumb"
        class="oreui-scrollbar-thumb oreui-scrollbar-thumb-horizontal"
        aria-hidden="true"
        :style="hThumbStyle"
        @pointerdown="onThumbPointerDown($event, 'horizontal')"
        @pointermove="onThumbPointerMove"
        @pointerup="onThumbPointerEnd"
        @pointercancel="onThumbPointerEnd"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: '240px'
})

const VERTICAL_SIZE = 12
const HORIZONTAL_SIZE = 16
const MIN_THUMB = 24

const viewport = ref<HTMLElement | null>(null)
const vThumb = ref<HTMLElement | null>(null)
const hThumb = ref<HTMLElement | null>(null)

const hasVertical = ref(false)
const hasHorizontal = ref(false)
const vTrackSize = ref(0)
const hTrackSize = ref(0)
const vThumbSize = ref(0)
const hThumbSize = ref(0)
const vThumbOffset = ref(0)
const hThumbOffset = ref(0)
const tabIndex = ref<0 | -1>(-1)
const dragging = ref<'vertical' | 'horizontal' | null>(null)

const dragStart = ref(0)
const scrollStart = ref(0)

let resizeObserver: ResizeObserver | null = null
let mutationObserver: MutationObserver | null = null

const wrapperStyle = computed(() => ({
  height: props.height
}))

const vThumbStyle = computed(() => ({
  height: `${vThumbSize.value}px`,
  transform: `translateY(${vThumbOffset.value}px)`
}))

const hThumbStyle = computed(() => ({
  width: `${hThumbSize.value}px`,
  transform: `translateX(${hThumbOffset.value}px)`
}))

function sync() {
  const el = viewport.value
  if (!el) return

  const hasV = el.scrollHeight > el.clientHeight
  const hasH = el.scrollWidth > el.clientWidth

  hasVertical.value = hasV
  hasHorizontal.value = hasH

  const verticalSize = Math.max(0, el.clientHeight - (hasH ? HORIZONTAL_SIZE : 0))
  const horizontalSize = Math.max(0, el.clientWidth - (hasV ? VERTICAL_SIZE : 0))

  vTrackSize.value = verticalSize
  hTrackSize.value = horizontalSize

  if (hasV && el.scrollHeight > el.clientHeight) {
    const size = Math.max(
      MIN_THUMB,
      (verticalSize * el.clientHeight) / el.scrollHeight
    )
    const travel = verticalSize - size
    const offset = (travel * el.scrollTop) / (el.scrollHeight - el.clientHeight)
    vThumbSize.value = size
    vThumbOffset.value = offset
  }

  if (hasH && el.scrollWidth > el.clientWidth) {
    const size = Math.max(
      MIN_THUMB,
      (horizontalSize * el.clientWidth) / el.scrollWidth
    )
    const travel = horizontalSize - size
    const offset = (travel * el.scrollLeft) / (el.scrollWidth - el.clientWidth)
    hThumbSize.value = size
    hThumbOffset.value = offset
  }

  tabIndex.value = hasV || hasH ? 0 : -1
}

function observeContent() {
  const el = viewport.value
  if (!el || !resizeObserver) return
  resizeObserver.observe(el)
  for (const child of Array.from(el.children)) {
    resizeObserver.observe(child)
  }
}

function onThumbPointerDown(event: PointerEvent, axis: 'vertical' | 'horizontal') {
  if (event.button !== 0) return
  event.preventDefault()
  const el = viewport.value
  if (!el) return

  dragging.value = axis
  dragStart.value = axis === 'vertical' ? event.clientY : event.clientX
  scrollStart.value = axis === 'vertical' ? el.scrollTop : el.scrollLeft

  const thumb = axis === 'vertical' ? vThumb.value : hThumb.value
  thumb?.setPointerCapture(event.pointerId)
}

function onThumbPointerMove(event: PointerEvent) {
  if (!dragging.value) return
  const el = viewport.value
  if (!el) return

  const vertical = dragging.value === 'vertical'
  const trackSize = vertical ? vTrackSize.value : hTrackSize.value
  const thumbSize = vertical ? vThumbSize.value : hThumbSize.value

  if (!trackSize || trackSize <= thumbSize) return

  const scrollRange = vertical
    ? el.scrollHeight - el.clientHeight
    : el.scrollWidth - el.clientWidth
  const pointer = vertical ? event.clientY : event.clientX
  const delta = pointer - dragStart.value
  const target = scrollStart.value + (delta * scrollRange) / (trackSize - thumbSize)

  if (vertical) {
    el.scrollTop = target
  } else {
    el.scrollLeft = target
  }
}

function onThumbPointerEnd() {
  dragging.value = null
}

function onKeydown(event: KeyboardEvent) {
  if (event.target !== viewport.value) return
  const el = viewport.value
  if (!el) return

  const vertical = el.scrollHeight > el.clientHeight

  if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault()
    if (vertical) {
      el.scrollTop = event.key === 'Home' ? 0 : el.scrollHeight
    } else {
      el.scrollLeft = event.key === 'Home' ? 0 : el.scrollWidth
    }
    return
  }

  const offsets: Record<string, { top?: number; left?: number }> = {
    ArrowDown: { top: 40 },
    ArrowUp: { top: -40 },
    ArrowRight: { left: 40 },
    ArrowLeft: { left: -40 },
    PageDown: vertical ? { top: el.clientHeight } : { left: el.clientWidth },
    PageUp: vertical ? { top: -el.clientHeight } : { left: -el.clientWidth }
  }

  const offset = offsets[event.key]
  if (offset) {
    event.preventDefault()
    el.scrollBy(offset)
  }
}

onMounted(() => {
  sync()
  resizeObserver = new ResizeObserver(() => sync())
  mutationObserver = new MutationObserver(() => {
    observeContent()
    resizeObserver?.disconnect()
    resizeObserver = new ResizeObserver(() => sync())
    observeContent()
    sync()
  })
  observeContent()
  mutationObserver.observe(viewport.value as HTMLElement, {
    childList: true,
    characterData: true,
    subtree: true
  })
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
  resizeObserver = null
  mutationObserver = null
})
</script>

<style scoped>
.oreui-scrollbar {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
}

.oreui-scrollbar::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.oreui-scrollbar-viewport {
  position: absolute;
  inset: 0;
  overflow: auto;
  box-sizing: border-box;
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
}

.oreui-scrollbar-viewport::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.oreui-scrollbar-track {
  position: absolute;
  z-index: 2;
  pointer-events: none;
}

.oreui-scrollbar-track[hidden] {
  display: none;
}

.oreui-scrollbar-track-vertical {
  top: 0;
  right: 0;
  width: 12px;
  background-color: rgba(0, 0, 0, 0.25);
}

.oreui-scrollbar-track-horizontal {
  left: 0;
  bottom: 0;
  height: 16px;
  background-color: rgba(0, 0, 0, 0.25);
}

.oreui-scrollbar-thumb {
  position: absolute;
  display: block;
  pointer-events: auto;
  box-sizing: border-box;
  touch-action: none;
  cursor: grab;
  border: 2px solid #1E1E1F;
  background:
    linear-gradient(#D0D1D4, #D0D1D4)
      center 4px / calc(100% - 8px) calc(100% - 12px) no-repeat,
    linear-gradient(#8D8D90, #8D8D90)
      center bottom 2px / calc(100% - 4px) 4px no-repeat,
    linear-gradient(#FFFFFF, #FFFFFF)
      center 2px / calc(100% - 4px) calc(100% - 8px) no-repeat,
    #B1B2B5;
}

.oreui-scrollbar-thumb-vertical {
  inset: 0 0 auto;
  width: 100%;
}

.oreui-scrollbar-thumb-horizontal {
  inset: 0 auto auto 0;
  height: 100%;
}

.oreui-scrollbar.is-dragging .oreui-scrollbar-thumb {
  cursor: grabbing;
}
</style>