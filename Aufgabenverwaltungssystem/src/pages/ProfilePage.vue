<template>
    <q-page class="flex flex-center">
        <ProfileForm/>
  </q-page>
</template>

<script>
import ProfileForm from "components/ProfileForm.vue"

export default {
  name: 'ProfilePage',
  components: {
      ProfileForm
  }
}
</script>