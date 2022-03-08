<template>
  <q-card flat bordered class="my-card bg-grey-1">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{ obj.title }}</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-item-label caption class="text-">due {{ obj.due }}</q-item-label>
    </q-card-section>

    <q-separator/>

    <q-card-actions>
      <q-btn label="show" color="secondary" @click="show = true"/>
    </q-card-actions>
  </q-card>

  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">{{ obj.title }}</div>
        <q-item-label caption class="text-">due {{ obj.due }}</q-item-label>

      </q-card-section>


      <q-card-section>
        <div class="text">{{ obj.desc }}</div>
      </q-card-section>
      <q-card-actions v-if="checkAdd" :key="obj.id" align="right" class="text-primary">
        <q-btn label="add" size="12px" color="secondary" @click="submitAdd" v-close-popup/>
        <q-btn flat label="Close" v-close-popup/>
      </q-card-actions>
      <q-card-actions v-else-if="checkCurrent" align="right" :key="obj.id" class="text-primary">
          <q-btn class="button" label="Mark Done" size="12px" color="secondary" @click="markDone" v-close-popup/>
          <q-btn class="button" label="Cancel Task" size="12px" color="negative" @click="markOpen" v-close-popup/>
        <q-btn align="right" flat label="Close" v-close-popup/>
      </q-card-actions>
      <q-card-actions v-else-if="checkDone" align="right" :key="obj.id" class="text-primary">
        <q-btn align="right" flat label="Close" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {defineComponent, ref} from "vue"

export default defineComponent({
  data(){
    return{
      checkAdd: ref(false),
      checkCurrent: ref(false),
      checkDone: ref(false)

    }
  },
  name: 'AuftragLink',
  props: {
    obj: Object,
    checkAdd: ref(false)

  },
  async created() {
    await this.fetchData()

  },
  async updated() {
    await this.fetchData()

  },

  methods: {
    async fetchData(){
      const person = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser).then(res => res.json())
      this.checkAdd = person[0].teamId !== this.obj.teamId;
      this.checkCurrent = person[0].teamId === this.obj.teamId && this.obj.assignmentStatus === "ACCEPTED";
      this.checkDone = person[0].teamId === this.obj.teamId && this.obj.assignmentStatus === "DONE";
    },
    async submitAdd() {
      const res = await fetch(this.backendUrl + "/assignments?id=" + this.obj.id).then(res => res.json()).then(json => json[0])
      const person = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser).then(res => res.json())
      res.teamId = person[0].teamId
      res.assignmentStatus = "ACCEPTED"
      const put = await fetch(this.backendUrl + "/assignments/" + res.id, {
        method: 'PUT',
        headers: {
          "content-Type": "application/json",
          "x-access-token": "token-value"
        },
        body: JSON.stringify(res)

      })
      this.$emit("eventClicked")


    },
    async markDone() {
      const res = await fetch(this.backendUrl + "/assignments?id=" + this.obj.id).then(res => res.json()).then(json => json[0])
      res.assignmentStatus = "DONE"
      const put = await fetch(this.backendUrl + "/assignments/" + res.id, {
        method: 'PUT',
        headers: {
          "content-Type": "application/json",
          "x-access-token": "token-value"
        },
        body: JSON.stringify(res)
      })
      this.$emit("eventClicked")
    },
    async markOpen() {
      const res = await fetch(this.backendUrl + "/assignments?id=" + this.obj.id).then(res => res.json()).then(json => json[0])
      res.assignmentStatus = "OPEN"
      res.teamId = 0
      const put = await fetch(this.backendUrl + "/assignments/" + res.id, {
        method: 'PUT',
        headers: {
          "content-Type": "application/json",
          "x-access-token": "token-value"
        },
        body: JSON.stringify(res)
      })
      this.$emit("eventClicked")
    }
  },
  setup() {
    return {
      show: ref(false),


    }
  }


})
</script>
<style lang="sass" scoped>

.button
  margin-right: 10px

</style>
