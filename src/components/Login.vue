<template>
  <v-container>
        <v-card
        class="mx-auto mt-10"
        max-width="600"
        tile
        >
            <v-container>
                <form>
                    <h3>Log In</h3>
                    <v-divider></v-divider>
                    <v-text-field
                    class="mt-5"
                    v-model="email"
                    label="Email"
                    >
                    </v-text-field>
                    <v-text-field
                    v-model="password"
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
            failed: false
        }
    },
    methods:{
        login(){
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                console.log("Logged in as " + user.email)
                this.$router.push("/dash")
            },
            err => {
                alert(err.message)
            })
        }
    }
}
</script>