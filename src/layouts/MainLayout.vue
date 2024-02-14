<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-primary text-white q-px-xl">
      <q-tabs align="center" class="q-px-xl">
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/news" label="News" />
      </q-tabs>
    </q-header>

    <q-page-container class="q-mt-xl">
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center q-pa-md">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Portal Berita
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
