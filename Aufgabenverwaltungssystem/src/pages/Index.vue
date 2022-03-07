<template>
    <q-layout view="hHh Lpr lff" container style="height:95vh" class="shadow-2 rounded-borders">

      <q-drawer
        side="right"
        v-model="drawerRight"
        show-if-above
        bordered
        :width="200"
        :breakpoint="500"
        class="bg-grey-3"
      >
      </q-drawer>

      <q-page-container>
          <AuftragTable />
      </q-page-container>
    </q-layout>

</template>
<script>
import AuftragTable from "src/components/AuftragTable.vue";
export default {
  name: 'PageIndex',
  components: { AuftragTable }
}
</script>




