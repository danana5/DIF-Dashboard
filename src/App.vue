<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="blue lighten-2" elevated="5" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title white--text">
            DIF Dashboard
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="white--text">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue darken-3" extended >
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer" style="margin-top: 35px"></v-app-bar-nav-icon>
      <v-toolbar-title><router-link to="/"><img src="./assets/logo.png" alt="DIF Logo" height="90%" width="90%" style="margin-top: 30px"></router-link></v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: null,
    items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard', to: "/" },
          { title: 'View Night Sheets', icon: 'mdi-clipboard-text-multiple-outline', to: "/list"},
          { title: 'Create Night Sheet', icon: 'mdi-clipboard-plus-outline', to: "/new" },
          { title: 'Search Night Sheets', icon: 'mdi-magnify', to: "/search" },
        ],
  }),
};
</script>
