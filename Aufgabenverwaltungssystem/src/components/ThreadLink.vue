<template>
  <div>
    <q-item clickable :to="{path: '/thread/' + this.thread.id}" v-ripple>
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white">
          <div class="text-h8">{{ thread.topic }}</div>
          <div class="text-subtitle2">by {{ thread.creator }}</div>
        </q-card-section>
        <q-separator/>
          <div class="row">
            <div class="col">
              <q-card-actions align="left">
                <q-item-label class="date-element">{{ thread.created }}</q-item-label>
              </q-card-actions>
            </div>
            <div class="col">
              <q-card-actions align="right">
                <q-item-label caption>{{ this.answersCount }}</q-item-label>
                <span class="material-icons">
          chat_bubble
          </span>
              </q-card-actions>
            </div>
          </div>
      </q-card>
    </q-item>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  data() {
    return {
      answersCount: null,
    }
  },
  name: 'ThreadLink',
  props: {
    thread: Object
  },


  async created() {
   this.fetchData()
  },

  async beforeUpdate(){
   this.fetchData()
  },

  methods:{
    async fetchData() {
      let answers = await fetch(this.backendUrl + "/threads/" + this.thread.id + "/answers").then(res => res.json())
      this.answersCount = await answers.length

    }

  }
})


</script>
<style lang="sass" scoped>
.my-card
  width: 100%

.material-icons, .date-element
  padding: 5px
</style>
