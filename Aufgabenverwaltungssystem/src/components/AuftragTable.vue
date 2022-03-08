<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Title</div>
      </q-card-section>

      <q-card-section>
        <div class="text-h6">Description von Auftrag</div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="OK" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-layout class="q-pa-md" :key="componentKey">
    <div v-if="model === 'two'">
    </div>
    <q-table :key="componentKey"
      grid
      card-class="bg-primary text-white"
      :rows="rows"
      row-key="id"
      :filter="filter"
      hide-header
      :pagination.sync="pagination"
    >

      <template v-slot:top-left>

        <q-btn-toggle
          v-model="model"
          onchange="getDataa"
          spread
          no-caps
          toggle-color="primary"
          color="white"
          text-color="black"
          :options="[
          {label: 'Current', value: 'one'},
          {label: 'Open', value: 'two'},
          {label: 'Completed', value: 'three'}
        ]"
        />
      </template>
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>


      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
          <q-card>
            <q-card-section>
            </q-card-section>
            <q-separator/>
            <AuftragLink :obj="props.row" @eventClicked="getDataa"/>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import AuftragLink from "src/components/AuftragLink.vue";

const columns = [
  {
    name: 'title',

  },

]

export default defineComponent({
  data() {
    return {
      pagination: {
        rowsPerPage: 6,
      },
      assignments: [],
      rows: [],
      model: ref('one')
    }
  },
  components: {
    AuftragLink
  },
  name: 'AuftragTable',
  methods: {
    async getDataa() {
      if (this.model === 'one') {
        const user = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser).then(res => res.json()).then(json => json[0])
        this.rows = await fetch(this.backendUrl + "/assignments?teamId="+user.teamId+"&assignmentStatus=ACCEPTED&_sort=due&_order=asc").then(res => res.json())
      }
      else if (this.model === 'two') {
        this.rows = await fetch(this.backendUrl + "/assignments?assignmentStatus=OPEN").then(res => res.json())
      }
      else if (this.model === 'three') {
        const user = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser).then(res => res.json()).then(json => json[0])
        this.rows = await fetch(this.backendUrl + "/assignments?teamId="+user.teamId+"&assignmentStatus=DONE&_sort=due&_order=asc").then(res => res.json())
      }
    }
  },


  async created() {
    this.$watch(
      () => this.model,
      async (toParams, previousParams) => {
        this.getDataa()
      },

    )
    this.$watch(
      () => this.componentKey,
      async (toParams, previousParams) => {
        this.getDataa()
      },
    )
    this.getDataa()

  },

  setup() {
    return {
      show: ref(false),
      filter: ref(''),
      columns,
      componentKey: 0,
      model: ref('one'),
    }
  }

})
</script>
<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>
