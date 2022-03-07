<template>
  <q-layout class="q-pa-md">
    <q-table
      grid
      card-class="bg-primary text-white"
      title="Auftraege"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
          <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"

        >
          <q-card>

            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label style="font-size: 130%;">{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label >{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-separator />

            <q-card-section>
              <AuftragLink/>
            </q-card-section>
            <q-card-section >
              <q-btn label="add" size="12px" color="primary" @click="add = true" />
            </q-card-section>

          </q-card>
        </div>
      </template>
    </q-table>
  </q-layout>
</template>

<script>
import { defineComponent,ref } from 'vue'
import AuftragLink from "src/components/AuftragLink.vue";

const columns = [
  {
    name: 'title',
    required: true,
    label: 'Title',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'expiration', align: 'center', label: 'Expiration', field: 'expiration', sortable: true }
]

const rows = [
  {
    name: 'Test 1',
    expiration: 2022

  },
  {
    name: 'Test 2',
    desc: 'testen testen testen',
    expiration: 2022

  },
  {
    name: 'Test 3',
    expiration: 2023
  },
  {
    name: 'Test 4',
    expiration: 2023
  },
  {
    name: 'Test 5',
    expiration: 2023
  },
  {
    name: 'Test 6',
    expiration: 2023
  },
  {
    name: 'Test 7',
    expiration: 2023
  },
  {
    name: 'Test 8',
    expiration: 2023
  }
]

export default defineComponent({
  components : {
    AuftragLink
  },
  name: 'AuftragTable',
  setup () {
    return {
      filter: ref(''),
      columns,
      rows
    }
  }
})
</script>
