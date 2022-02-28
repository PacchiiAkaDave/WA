<template>
  <q-btn label="add" color="primary" @click="add = true" />

  <q-dialog v-model="add" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Title</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="title" autofocus @keyup.enter="add = false" />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Desc</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="desc" type="textarea" autofocus @keyup.enter="add = false" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-radio v-model="kind" val="global" label="Global" />
          <q-radio v-model="kind" val="team" label="Team" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Thread" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent,ref } from 'vue'

export default defineComponent({
  name: 'ThreadForm',
  setup () {
    return {
      
      add: ref(false),

      title: ref(''),
      desc: ref(''),
      kind: ref('global')
    }
  }
})
</script>
