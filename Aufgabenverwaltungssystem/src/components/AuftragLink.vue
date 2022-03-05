<template>
  <q-btn label="show" color="secondary" @click="show = true" />

  <q-dialog v-model="show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Auftragtitel</div>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Description von Auftrag</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent,ref } from "vue"

export default defineComponent({
  name: 'AuftragLink',
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
