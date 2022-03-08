<template>
    <div class="column" style="height: 100vh" align="center">

        <TeamInfo ref="infoPanel" @eventRefreshed="refreshDone"></TeamInfo>

        <q-card flat bordered class="my-card bg-grey-1">
          <q-card-section>
            <div class="row items-center no-wrap">
              <div class="col">
                <q-item-label caption>Team Members</q-item-label>
                <q-separator/>

              </div>
            </div>
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
        </q-card>
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
      teamInfo: null
    }
  },
  props: {},
  components: {
    TeamInfo
  },
  name: "MainSideboard",
  methods:{
    async refresh(){
      await this.teamInfo.reloadThem()
    },
    refreshDone(){
      this.$forceUpdate()
    }
  },
  async created() {
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
  mounted() {
    this.teamInfo = this.$refs.infoPanel
  },
  setup() {
    const myListRef = ref(null)

    return {
      myListRef,
      listEl: computed(() => myListRef.value ? myListRef.value.$el : null),

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

