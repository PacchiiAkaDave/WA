<!-- mit /#/thread auf die page-->
<template>

  <div view="hHh Lpr lFr" id="top">
    <Thread :thread="this.thread" :key="this.componentKey"/>
    <div v-for="answer in this.answers" :key="this.componentKey">
      <Answer :answer="answer"></Answer>
    </div>
    <q-footer class="bg-white">

      <q-input square outlined v-model="content">
        <template v-slot:append>
          <q-btn dense flat round color="primary" icon="send" @click="submitAnswer"/>
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
      content: ref(''),

      thread: null,
      answers: null,
      componentKey: 0,
      refresh: false

    }
  },
  async created() {
    this.$watch(
      () => this.$route.params,
      async (toParams, previousParams) => {
        this.answers = null
        await this.fetchData(toParams.id)
      }
    )
    await this.fetchData(this.id)
  },
  async updated(){
    if (this.refresh){
      window.scrollTo(0,document.body.scrollHeight*2);
      this.refresh=!this.refresh
    }
  },

  components: {
    Answer,
    Thread
  },
  methods: {
    async submitAnswer() {
      const person = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser).then(res => res.json()).then(json => json[0])
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
      this.answers = await fetch(this.backendUrl + "/threads/" + this.id + "/answers").then(res => res.json())
      this.componentKey +=1;
      this.refresh = true;

    },
    async fetchData(id) {
      this.thread = await fetch(this.backendUrl + "/threads/" + id).then(res => res.json())
      this.answers = await fetch(this.backendUrl + "/threads/" + id + "/answers").then(res => res.json())
    },
  },
}

</script>
<style lang="sass" scoped>

</style>
