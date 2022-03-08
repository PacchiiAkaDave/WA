<template>
  <div class="row">

   <div class="col avatar" style="padding-top: 20px" align="center">
     <q-avatar size="250px">
       <img src="https://cdn.quasar.dev/img/boy-avatar.png">
     </q-avatar>
   </div>
    <div class="col" align="center">
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width:400px">
          <q-input filled v-model="firstName" hint="First Name" :dense="dense" />
          <q-input filled v-model="lastName" hint="Last Name" :dense="dense" />
          <q-input filled v-model="email" hint="Email" :dense="dense" />
          <q-input filled v-model="phoneNumber" hint="Phone Number" :dense="dense" />
          <q-btn color="primary" label="Submit" />
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import { ref } from 'vue'

export default {
  data(){
    return{
    currentUser: null
  }},
  name: 'ProfileForm',
  props:{

  },
  async created() {
    const person = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser).then(res => res.json()).then(json=>json[0])
    this.firstName = person.firstName
    this.lastName = person.lastName
    this.email = person.email
    this.phoneNumber = person.phoneNumber
    console.log(person.firstName)
  },
  setup () {
    return {
      firstName: ref(''),
      lastName: ref(''),
      email: ref(''),
      phoneNumber: ref('')


    }
  }

}
</script>
<style lang="sass">
.q-gutter-md
  margin-top: 20px
.avatar
   margin-top: 30px
</style>
