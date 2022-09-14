<template>
<v-dialog v-model="logged" persistent max-width="600">
        <v-card class="mx-auto blue--text text--darken-3" max-width="600" :loading="loading" :disabled="loading" rounded elevation="10">
            <v-container>
                <form>
                    <h2 style="text-align: center;">This website has been hacked!!!!!!</h2>
                    <v-divider></v-divider>
                    <v-text-field class="mt-5" v-model="email" label="Email" outlined>
                    </v-text-field>
                    <v-text-field v-model="password" outlined :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'" label="Password" @click:append="show = !show"></v-text-field>
                    <v-checkbox v-checkbox v-model="rememberME" label="Stay Logged in?"></v-checkbox>
                    <v-btn class="white--text" color="blue darken-3" outlined rounded text @click="login">
                        Login
                    </v-btn>
                </form>
            </v-container>
        </v-card>
</v-dialog>
</template>

<script>
import firebase from "firebase"
export default {
    data() {
        return {
            email: "",
            password: "",
            show: false,
            rememberME: false,
            failed: false,
            loading: false,
            logged: true
        }
    },
    methods: {
        login() {
            this.loading = true
            if (this.rememberME) {
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(user => {
                            console.log("Logged in as " + user.email)
                            this.$router.push("/dash")
                            this.loading = false
                            this.logged = false
                        },
                        err => {
                            alert(err.message)
                            this.loading = false
                        })
            } else {
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(user => {
                            console.log("Logged in as " + user.email)
                            this.$router.push("/dash")
                            this.loading = false
                            this.logged = false
                        },
                        err => {
                            alert(err.message)
                            this.loading = false
                        })
            }
        }
    }
}
</script>
