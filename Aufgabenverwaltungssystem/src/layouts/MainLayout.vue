<template>
  <q-layout view="lHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="tag" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          AuftragCheck
        </q-toolbar-title>

        <q-btn dense flat round icon="account_circle" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <q-list>
        <q-item-label
          header
        >
          <b>Threads</b>
          
        </q-item-label>

        <q-btn-toggle
        v-model="model"
        class="my-custom-toggle q-pa-md"
        no-caps
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          {label: 'Global', value: 'one'},
          {label: 'Team', value: 'two'},
          {label: 'Eigene', value: 'three'}
        ]"
      />
      <q-btn push color="primary" label="+" />
      </q-list>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <q-list>
        <q-item-label
          header
        >
          <b>Hallo *Personenname*!</b>
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

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

import { defineComponent,ref } from 'vue'

export default defineComponent({

  name: 'MainLayout',
  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      model: ref('one'),
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
})
</script>