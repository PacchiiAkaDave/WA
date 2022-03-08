<template>
    <q-card flat bordered class="my-card bg-grey-1 ">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <q-item-label caption>Team Info</q-item-label>
          </div>
        </div>
        <q-separator/>
        <div style="padding-top: 15px">
        <q-item-label>ID</q-item-label>
          <q-item-label caption>{{loggedUser.teamId}}</q-item-label>
        </div>
        <div style="padding-top: 15px">
        <q-item-label>ROLE</q-item-label>
        <q-item-label caption>{{teamRole}}</q-item-label>
        </div>
        <div style="padding-top: 15px">
          <q-item-label>CURRENT</q-item-label>
          <q-item-label caption>{{countCurrent}}</q-item-label>
        </div>
        <div style="padding-top: 15px">
          <q-item-label>COMPLETED</q-item-label>
          <q-item-label caption>{{countCompleted}}</q-item-label>
        </div>
      </q-card-section>

    </q-card>

</template>

<script>
export default {
  data() {
    return {
      team: Object,
      teamRole: "",
      loggedUser: Object,
      countCurrent: 0,
      countCompleted:0
    }
  },
  name: "TeamInfo",
  async created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      async () => {

        this.loggedUser = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser).then(res => res.json()).then(json => json[0])
        this.team = await fetch(this.backendUrl + "/teams/" + this.loggedUser.teamId).then(res => res.json())
        if(this.loggedUser.username === this.team.teamLeader){
          this.teamRole="Team Leader"
        }else{
          this.teamRole="Team Member"
        }
         this.countCurrent  = await fetch(this.backendUrl + "/assignments?teamId="+ this.loggedUser.teamId + "&assignmentStatus=ACCEPTED").then(res=>res.json()).then(json => json.length)
        this.countCompleted  = await fetch(this.backendUrl + "/assignments?teamId="+ this.loggedUser.teamId + "&assignmentStatus=DONE").then(res=>res.json()).then(json => json.length)




      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )




  },
  setup() {
    return {}
  }

}


</script>

<style scoped>

</style>
