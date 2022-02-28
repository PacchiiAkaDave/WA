<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  >
    

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ created }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ThreadLink',
  props: {
    id: {
        type: Number,
        required: true
    },
    title: {
      type: String,
      required: true
    },

    created: {
      type: Date,
      default: Date.UTC()
    },

    link: {
      type: String,
      default: '#/thread/0'
    }
  }
})
</script>