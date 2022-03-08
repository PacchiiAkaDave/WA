<template>
  <q-card flat bordered class="my-card">
    <q-card-section class="q-pt-none bg-secondary text-white">
      <div class="text-h6">{{thread.topic}}</div>
      <div class="text-subtitle2">by {{ thread.creator }}</div>

    </q-card-section>
    <q-separator inset />
    <q-card-section>
      {{thread.desc}}
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from "vue"
import AnswerForm from "./AnswerForm.vue"

export default defineComponent({
    name: 'Thread',
    components:{

    },
    props:{
      thread: Object,
    },
    setup() {
        return{
        }
    },


})
</script>
<style lang="sass" scoped>
.my-card
  margin: 10px
.text-h6
  padding-top: 10px


</style>
