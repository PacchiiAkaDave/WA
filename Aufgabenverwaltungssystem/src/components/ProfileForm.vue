<template>
  <div class="row">
  <div class="col">
    <div class="flex justify-center q-pt-md" style="font-size: 20em">
     <q-icon name="account_circle"/>
    </div>
    <div class="flex justify-center q-pt-md">
      <q-btn color="primary" label="Change Picture" />
    </div>
  </div>
  <div class="col">
  <div class="flex justify-end q-pa-md">
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <div class="text-h6">{{persons.fistName}} {{persons.lastName}}</div>
        <div class="text-subtitle2">Team {{persons.teamId}}</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <div class="row">
          <div class="col flex justify-start">
           Phone Number
          </div>
         <div class="col flex justify-end">
           0152/123123123
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <b>Adresse</b>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col flex justify-start">
           PLZ
          </div>
         <div class="col flex justify-end">
           49XXX
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col flex justify-start">
           Stadt
          </div>
         <div class="col flex justify-end">
           Osnabrück
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col flex justify-start">
           Straße
          </div>
         <div class="col flex justify-end">
           Albrechtstr. 30
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="flex justify-center q-pa-md">
      <q-btn color="secondary" label="Edit Profile" @click="edit = true"/>
    </div>
  </div>
  </div>
  </div>

  <q-dialog v-model="edit" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">first name</div>
        </q-card-section>
        <q-card-section>
          <q-input dense v-model="f_name" autofocus @keyup.enter="edit = false"/>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">last name</div>
        </q-card-section>
        <q-card-section>
          <q-input dense v-model="l_name" autofocus @keyup.enter="edit = false"/>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">phone number</div>
        </q-card-section>
        <q-card-section>
          <q-input dense v-model="p_number" autofocus @keyup.enter="edit = false"/>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">PLZ</div>
        </q-card-section>
        <q-card-section>
          <q-input dense v-model="plz" autofocus @keyup.enter="edit = false"/>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">town</div>
        </q-card-section>
        <q-card-section>
          <q-input dense v-model="town" autofocus @keyup.enter="edit = false"/>
        </q-card-section>

        <q-card-section>
          <div class="text-h6">street</div>
        </q-card-section>
        <q-card-section>
          <q-input dense v-model="street" autofocus @keyup.enter="edit = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn @click="editProfile" label="Edit Profile" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  
</template>

<script>
import {ref} from 'vue'


export default {
  name: 'ProfileForm',
  props:{
    persons: Object
  },
  setup(){
    return {
      edit: ref(false),
      f_name: ref(this.persons.firstName),
      l_name: ref(this.persons.lastName),
      p_number: ref(''),
      plz: ref(''),
      town: ref(''),
      street: ref('')
    }
  },

  methods:{

    async editProfile() {
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
  
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
Lorem i
