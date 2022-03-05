<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered padding>
        <q-item-label header>List Header</q-item-label>
        <template><!--mit for-schleife arbeiten-->
            <q-item>
                {{title}}
                <AuftragLink/>
            </q-item>
        </template>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AuftragLink from "./AuftragLink.vue";

export default defineComponent({
    name: 'TeamAuftragTable',
    components: {
        AuftragLink
    }
})



</script>