<!-- mit /#/thread auf die page-->
<template>

  <div view ="hHh Lpr lFr">
    <Thread :thread="this.thread"/>
    <div v-for="answer in this.answers">
      <Answer :answer="answer"></Answer>
    </div>
    <q-footer class="bg-white">

      <q-input square outlined v-model="content">
        <template v-slot:append>
          <q-btn dense flat round icon="send" @click="submitAnswer"/>
        </template>
      </q-input>
    </q-footer>


  </div>

</template>
<script>
import Thread from "src/components/Thread.vue"
import Answer from "components/Answer";
import {ref} from "vue";

export default {
  name: 'ThreadPage',

  data() {
    return {
      id: this.$route.params.id,
      thread: null,
      answers: null,
      content: ref('')

    }
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      async (toParams, previousParams) => {
        this.thread = await fetch(this.backendUrl + "/threads/" + toParams.id).then(res => res.json())
        this.answers = await fetch(this.backendUrl + "/threads/" + toParams.id + "/answers").then(res => res.json())
      }
    )
    this.thread = await fetch(this.backendUrl + "/threads/" + this.id).then(res => res.json()),
      this.answers = await fetch(this.backendUrl + "/threads/" + this.id + "/answers").then(res => res.json())
  },
  components: {
    Answer,
    Thread
  },
  methods:{
    async submitAnswer(){
      const person = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser ).then(res => res.json()).then(json => json[0])
      const res = await fetch(this.backendUrl + "/answers", {
        method: 'POST',
        headers: {
          "content-Type": "application/json",
          "x-access-token": "token-value"
        },
        body: JSON.stringify({
          creator: this.prototypeUser,
          content: this.content,
          threadId: this.thread.id,
          personId: person.id
        })
      })
    this.content = ref('')
    }
  },

}

</script>
<style lang="sass">

</style>
