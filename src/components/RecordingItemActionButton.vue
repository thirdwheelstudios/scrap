<script lang="ts">
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  emits: ['click'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props: any, context: any) {
    return {
      onClick: () => {
        context.emit('click')
      },
    }
  },
}
</script>

<template>
  <button @click="onClick">
    <font-awesome-icon :icon="icon" /><slot></slot>
  </button>
</template>

<style scoped lang="scss">
button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  > * {
    font-size: 1.25em;
    margin-right: 0.25rem;
  }
}
</style>
