<template>
  <v-container>
        <v-card
        class="mx-auto mt-10 blue--text text--darken-3"
        max-width="600"
        :loading="loading"
        :disabled="loading"
        rounded
        elevation="10"
        >
            <v-container>
                <form>
                    <h2 style="text-align: center;">Log In</h2>
                    <v-divider></v-divider>
                    <v-text-field
                    class="mt-5"
                    v-model="email"
                    label="Email"
                    outlined
                    >
                    </v-text-field>
                    <v-text-field
                    v-model="password"
                    outlined
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    @click:append="show = !show"
                    >
                    </v-text-field>
                    <v-btn
                    class="white--text"
                    color="blue darken-3"
                    outlined
                    rounded
                    text
                    @click="login"
                    >
                    Login
                    </v-btn>
                </form>
            </v-container>
        </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase"
export default {
    data() {
        return {
            email: "",
            password: "",
            show: false,
            failed: false,
            loading: false,
        }
    },
    methods:{
        login(){
            this.loading = true
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                console.log("Logged in as " + user.email)
                this.$router.push("/dash")
                this.loading = false
            },
            err => {
                alert(err.message)
            })
        }
    }
}
</script>