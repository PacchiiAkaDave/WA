<template>
  <q-layout view="hHh LpR lFr" class="main-frame">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="tag" @click="toggleLeftDrawer"/>
        <q-item-label v-if="!leftDrawerOpen"> Threads</q-item-label>
        <q-toolbar-title class="">
          <q-item>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            Assignment Check
          </q-item>
        </q-toolbar-title>
        <q-item-label v-if="!rightDrawerOpen"> Menu</q-item-label>
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
              <b>Hallo *Personenname*!</b>
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
    title: 'Profil',
    caption: 'Profil bearbeiten',
    icon: 'manage_accounts',
    link: '/profil'
  },
  {
    title: 'Team',
    caption: 'Details deines Teams',
    icon: 'groups',
    link: '/team'
  },
  {
    title: 'Schwarzes Brett',
    caption: 'schau nach offenen Auftraegen',
    icon: 'assignment',
    link: '/auftrag'
  },
  {
    title: 'Einstellungen',
    caption: 'Einstellungen aendern',
    icon: 'settings',
    link: '/einstellungen'
  },
  {
    title: 'Abmelden',
    caption: 'abmelden',
    icon: 'logout',
    link: '/logout'
  }

];


export default defineComponent({

  name: 'MainLayout',
  components: {
    EssentialLink,
    ThreadForm,
    ThreadLink,
    ThreadList
  },
  updated() {
    console.log("updated")
  },


  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
      if(this.leftDrawerOpen){
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
