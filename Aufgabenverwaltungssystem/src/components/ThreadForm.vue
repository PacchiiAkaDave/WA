<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18] ">
    <q-btn fab icon="add" color="primary" @click="add = true"/>
  </q-page-sticky>

  <q-dialog v-model="add" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Title</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input dense v-model="title" autofocus @keyup.enter="add = false"/>
      </q-card-section>

      <q-card-section>
        <div class="text-h6">Desc</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="desc" type="textarea" autofocus @keyup.enter="add = false"/>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-radio v-model="kind" val="global" label="Global"/>
        <q-radio v-model="kind" val="team" label="Team"/>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup/>
        <q-btn @click="submitThread" flat label="Add Thread" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>


<script>
import {defineComponent, ref} from 'vue'


export default defineComponent({
  name: 'ThreadForm',
  components:{
  },
  setup() {
    return {

      add: ref(false),
      title: ref(''),
      desc: ref(''),
      kind: ref('global')
    }
  },

  methods:{

    async submitThread() {
      const currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')
      const person = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser ).then(res => res.json()).then(json => json[0])
      const res = await fetch(this.backendUrl + "/threads", {
        method: 'POST',
        headers: {
          "content-Type": "application/json",
          "x-access-token": "token-value"
        },
        body: JSON.stringify({
          created: currentDate,
          creator: this.prototypeUser,
          desc: this.desc,
          topic: this.title,
          type: this.kind === 'global' ? 'GlobalThread' : 'TeamThread',
          teamId: this.kind === 'team' ? person.teamId : null,
          personId: person.id
        })
      })

    }

  }
})
</script>
