<script setup lang="ts">
import { onMounted } from 'vue'

interface Props {
  adClient?: string,
  adSlot?: string,
}

withDefaults(defineProps<Props>(), {
  adClient: 'ca-pub-1874401332613980',
  adSlot: '3901181364',
})

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adsbygoogle = (window as any).adsbygoogle as any

  adsbygoogle?.push({})
})
</script>

<template>
  <div>
    <ins
      class="adsbygoogle"
      style="display:inline-block;width:728px;height:90px"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true">
    </ins>
  </div>
</template>

<style scoped lang="scss">
div {
  display: flex;
  justify-content: center;
}
</style>