<template>
  <q-layout view="hHh LpR lFr" class="main-frame">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="tag" @click="toggleLeftDrawer"/>
        <q-item-label v-if="!leftDrawerOpen"></q-item-label>
        <q-toolbar-title class="text-center">
          Work
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" onclick="'/'">
            </q-avatar>
          Check
        </q-toolbar-title>
        <q-item-label v-if="!rightDrawerOpen"></q-item-label>
        <q-btn dense flat round icon="account_circle" @click="toggleRightDrawer"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-layout container style="height: 90vh">
        <q-item-label header>
          <div class="row">
            <div class="col-2">
              <q-btn dense flat round icon="navigate_before" @click="toggleLeftDrawer"/>
            </div>
            <div class="col thread">
              <b>Threads</b>
            </div>
          </div>
        </q-item-label>
        <div class="q-pa-md">
          <div class="column" style="height: 75vh">
            <div class="col-8">
              <ThreadList/>
            </div>
            <div class="col">
              <ThreadForm/>
            </div>
          </div>
        </div>
      </q-layout>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <q-layout container style="height: 90vh">
        <q-item-label header>
          <div class="row">
            <div class="col-10 person">
              <b>Hello {{this.username}}</b>
            </div>
            <div class="col">
              <q-btn dense flat round icon="navigate_next" @click="toggleRightDrawer"/>
            </div>
          </div>
        </q-item-label>
        <div class="list-frame" v-for="obj in essentialLinks" :key="obj.title">
          <EssentialLink :obj="obj"></EssentialLink>
        </div>
      </q-layout>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import ThreadForm from 'components/ThreadForm.vue'
import ThreadLink from 'components/ThreadLink.vue';
import ThreadList from "components/ThreadList";
import {defineComponent, ref} from 'vue'

const linksList = [
  {
    title: 'Profile',
    caption: 'Edit profile information',
    icon: 'manage_accounts',
    link: '/profil'
  },
  {
    title: 'Team',
    caption: 'Edit your team.',
    icon: 'groups',
    link: '/error'
  },
  {
    title: 'Einstellungen',
    caption: 'Einstellungen aendern',
    icon: 'settings',
    link: '/error'
  },
  {
    title: 'Abmelden',
    caption: 'abmelden',
    icon: 'logout',
    link: '/error'
  }

];


export default defineComponent({
  data(){
    return{
      user: null,
      username: " "
    }
  },
  name: 'MainLayout',
  components: {
    EssentialLink,
    ThreadForm,
    ThreadLink,
    ThreadList
  },
 async created() {
    this.user = await fetch(this.backendUrl + "/persons?username=" + this.prototypeUser).then(res => res.json()).then(json => json[0])
    this.username = this.user.firstName + " " + this.user.lastName
 },


  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
      if(this.leftDrawerOpen){
        if(this.rightDrawerOpen){
          this.rightDrawerOpen=!this.rightDrawerOpen
        }
        this.$router.push('/thread')
      }else{
        this.$router.push('/')
      }
    },
    toggleRightDrawer() {
      this.rightDrawerOpen = !this.rightDrawerOpen
      if(this.rightDrawerOpen){
        if(this.leftDrawerOpen){
          this.leftDrawerOpen=!this.rightDrawerOpen
        }
        this.$router.push('/profil')
      }else{
        this.$router.push('/')
      }
    }
  },
  props: {
    leftDrawerOpen: null,
    rightDrawerOpen: null,
  },
  setup() {

    return {
      essentialLinks: linksList,
      leftDrawerOpen: ref(false),
      rightDrawerOpen: ref(false)
    }
  }
})
</script>
<style lang="sass" scoped>
.person
  padding-top: 10px

.thread
  padding-top: 10px


</style>
