<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <q-item-label>
        <q-avatar size="35px">
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"/>
        </q-avatar>
        {{ answer.creator }}
      </q-item-label>
    </q-card-section>
    <q-separator inset/>
    <q-card-section>
      {{ answer.content }}
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "Answer",
  props: {
    answer: Object
  }
}
</script>

<style lang="sass" scoped>
.my-card
  margin: 10px

</style>
