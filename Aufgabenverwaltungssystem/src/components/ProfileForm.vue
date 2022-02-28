<template>
  
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width:400px">
      <q-input filled v-model="text" label="first_name" value="first" hint="first name" :dense="dense" />
      <q-input filled v-model="text" label="last_name" value="last" hint="last name" :dense="dense" />
      <q-input filled v-model="text" label="p_number" value="p_number" hint="phone number" :dense="dense" />
      <q-input filled v-model="number" label="plz" value="plz" hint="PLZ" :dense="dense" />
      <q-input filled v-model="text" label="street" value="street" hint="street" :dense="dense" />
      <q-input filled v-model="text" label="town" value="town" hint="town" :dense="dense" />
      <q-btn color="primary" label="Submit" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileForm',
  props:{
    
  }
  
}
</script>
