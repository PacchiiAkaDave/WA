<template>
  <div class="text-center">

    <q-btn-toggle
      v-model="model"
      class="my-custom-toggle q-pa-md align-cen"
      no-caps
      rounded
      unelevated
      toggle-color="primary"
      color="white"
      text-color="primary"

      :options="[
          {label: 'Global', value: 'one'},
          {label: 'Team', value: 'two'},
          {label: 'Eigene', value: 'three'}
        ]"
    />
  </div>

  <!--q-btn push color="primary" label="+" /-->
  <div v-if="model === 'one'" :key="thread.id" v-for="thread in globalThreads" >
   <ThreadLink :thread="thread"/>
  </div>
  <div v-if="model === 'two'" :key="thread.id" v-for="thread in teamThreads" >
    <ThreadLink :thread="thread"/>
  </div>
  <div v-if="model === 'three'" :key="thread.id" v-for="thread in selfThreads" >
    <ThreadLink :thread="thread"/>
  </div>
</template>

<script>
import ThreadLink from "components/ThreadLink";
import {ref} from "vue";
export default {
  data(){
    return{
      globalThreads: null,
      teamThreads: null,
      selfThreads: null,
    }
  },
  name: 'ThreadList',
  components: {
    ThreadLink,
  },
  async created() {
    const user = await fetch(this.backendUrl + "/persons?username="+this.prototypeUser).then(res => res.json()).then(json => json[0])

    this.globalThreads = await fetch(this.backendUrl + "/threads?type=GlobalThread").then(res => res.json())
    this.teamThreads = await fetch(this.backendUrl + "/teams/" + user.teamId + "/threads").then(res => res.json())
    this.selfThreads = await fetch(this.backendUrl + "/persons/" + user.id + "/threads").then(res=> res.json())

  },
  setup () {
    return {
      model: ref('one'),

    }
  }
}
</script>
