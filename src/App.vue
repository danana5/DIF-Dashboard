<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" color="blue-grey darken-4" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title white--text">
            DIF Dashboard
          </v-list-item-title>
          <v-list-item-subtitle class="white--text">
            {{ new Date().toDateString() }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="white--text">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider> </v-divider>
        <v-list-item class="mt-3 mb-3">
          <v-textarea
            label="Notes"
            class="white--text"
            color="white"
            outlined
            dark
            background-color="blue-grey darken-3"
            no-resize
            rounded
            hide-details
          >
          </v-textarea>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon color="white">mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="white--text">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-footer color="blue-grey darken-4" class="footer ml-11">
        <p class="white--text">©{{ new Date().getFullYear() }} Dan Grace</p>
      </v-footer>
    </v-navigation-drawer>

    <v-app-bar app color="blue darken-3" extended>
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
        style="margin-top: 35px"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/dash"
          ><img
            src="./assets/logo.png"
            alt="DIF Logo"
            height="90%"
            width="90%"
            style="margin-top: 30px"
        /></router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: 'App',

    components: {},

    data: () => ({
      drawer: null,
      items: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard',
          to: '/dash',
        },
        {
          title: 'View Night Sheets',
          icon: 'mdi-clipboard-text-multiple-outline',
          to: '/list',
        },
        {
          title: 'Create Night Sheet',
          icon: 'mdi-clipboard-plus-outline',
          to: '/new',
        },
        {
          title: 'Search Night Sheets',
          icon: 'mdi-magnify',
          to: '/search',
        },
        {
          title: 'Party Sheet Management',
          icon: 'mdi-party-popper',
          to: '/parties',
        },
      ],
      loggedIn: false,
    }),
    methods: {
      logout() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push(`/login`);
          });
      },
    },
  };
</script>

<style scoped>
  .footer {
    position: fixed;
    bottom: 0;
  }
</style>
