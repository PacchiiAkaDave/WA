<template>
  <q-btn label="answer" color="secondary" @click="answer = true" />

  <q-dialog v-model="answer" persistent>
      <q-card style="min-width: 350px">

        <q-card-section>
          <div class="text-h6">Desc</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="desc" type="textarea" autofocus @keyup.enter="add = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add answer" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script>
import { defineComponent,ref } from 'vue'

export default defineComponent({
  name: 'AnswerForm',
  setup () {
    return {

      answer: ref(false),
      desc: ref(''),
    }
  }
})
</script>
