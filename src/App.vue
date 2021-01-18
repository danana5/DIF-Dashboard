<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
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
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="blue darken-3">
      <v-app-bar-nav-icon color="white" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><router-link to="/"><img src="./assets/logo.png" alt="DIF Logo" height="70%" width="70%"></router-link></v-toolbar-title>
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
        ],
  }),
};
</script>
