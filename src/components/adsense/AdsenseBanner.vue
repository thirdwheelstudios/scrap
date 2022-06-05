<script setup lang="ts">
import { onMounted } from 'vue'

interface Props {
  client?: string,
  slot?: string,
}

withDefaults(defineProps<Props>(), {
  client: 'ca-pub-1874401332613980',
  slot: '3901181364',
})

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adsbygoogle = (window as any).adsbygoogle as any

  adsbygoogle?.push({})
})
</script>

<template>
<!-- Header -->
<ins
  class="adsbygoogle"
  style="display:inline-block;width:728px;height:90px"
  :data-ad-client="client"
  :data-ad-slot="slot"
  data-ad-format="auto"
  data-full-width-responsive="true">
</ins>
</template>