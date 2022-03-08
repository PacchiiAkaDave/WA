<template>
  <div class="q-pa-md">
    <div class="column" style="height: 90vh" align="center">
      <div class="col-1">
        <q-avatar size="55px">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"/>
        </q-avatar>
      </div>
      <div class="col-4">
        <TeamInfo></TeamInfo>
      </div>

      <div class="col-2" >


        <q-card flat bordered class="my-card bg-grey-1 ">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <q-item-label caption>Team Members</q-item-label>
              </div>

            </div>
            <q-separator/>

          </q-card-section>
          <q-scroll-area style="height: 250px; max-width: 200px;" class="no-padding scrollb">
            <div v-for="obj in teamMembers" :key="obj.id">
              <q-item>
                <q-item-section>{{obj.firstName}} {{obj.lastName}}</q-item-section>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  </q-avatar>
                  <q-separator/>

                </q-item-section>
              </q-item>
            </div>
          </q-scroll-area>
          <q-card-actions>
          </q-card-actions>
        </q-card>

      </div>




    </div>
  </div>



</template>

<script>
import TeamInfo from "components/TeamInfo";
import {ref, computed} from 'vue'

export default {
  data() {
    return {
      loggedUser: null,
      teamMembers: null,
    }
  },
  props: {},
  components: {
    TeamInfo
  },
  name: "MainSideboard",
  async created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      async () => {
        this.loggedUser = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser).then(res => res.json()).then(json => json[0])
        this.teamMembers = await fetch(this.backendUrl + "/persons?teamId=" + this.loggedUser.teamId).then(res => res.json())
      },
      // fetch the data when the view is created and the data is
      // already being observed
      {immediate: true}
    )
    this.loggedUser = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser).then(res => res.json()).then(json => json[0])
    this.teamMembers = await fetch(this.backendUrl + "/persons?teamId=" + this.loggedUser.teamId).then(res => res.json())

  },
  setup() {
    const myListRef = ref(null)

    return {
      myListRef,
      listEl: computed(() => myListRef.value ? myListRef.value.$el : null)
    }
  }
}

</script>


<style lang="sass" scoped>
.example-item
  max-height: 50px
  min-height: 10px
  width: 100px
</style>

