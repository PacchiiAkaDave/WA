<template>
  <q-item
    clickable :to="{path: this.obj.link}" v-ripple>
    <q-item-section
      v-if="obj.icon"
      avatar
    >
      <q-icon :name="obj.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ obj.title }}</q-item-label>
      <q-item-label caption>
        {{ obj.caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    obj: Object
  }
})
</script>
