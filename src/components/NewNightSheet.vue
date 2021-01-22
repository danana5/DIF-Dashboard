<template>
    <v-container>
        <v-card
        class="mx-auto mt-10"
        max-width="1000"
        tile
        :disabled="loading"
        :loading="loading"
        >
        <v-card-title>
                    New Night Sheet
                </v-card-title>
            <v-container>
                <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                >
                    <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date"
                        label="Date"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                    >
                        OK
                    </v-btn>
                    </v-date-picker>
                </v-menu>
                    <v-text-field
                    v-model="sheetName"
                    :rules="nameRules"
                    label="Name"
                    placeholder="Name"
                    required
                    clearable
                    >
                    </v-text-field>
                    <v-text-field
                    v-model="day"
                    :rules="dayRules"
                    label="Day"
                    placeholder="Day"
                    required
                    clearable
                    >
                    </v-text-field>
                    <v-textarea
                    v-model="notes"
                    label="Notes"
                    auto-grow
                    placeholder="Notes"
                    clearable
                    >
                    </v-textarea>
                    <v-divider></v-divider>
                    <v-row>
                        <v-col>
                            <v-text-field
                            v-model="cash"
                            :rules="cashRules"
                            label="Cash Recieved"
                            required
                            prepend-icon="€"
                            clearable
                            >
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                            v-model="card"
                            :rules="cardRules"
                            label="Card Recieved"
                            required
                            prepend-icon="€"
                            clearable
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-checkbox
                    value="tasks"
                    label="All tasks completed?"
                    :rules="[v => !!v || 'You must completed your tasks to submit!']"
                    required      
                    >
                    </v-checkbox>
                    <v-btn
                    class="white--text mr-4" 
                    color="red darken-3"
                    outlined
                    rounded
                    text
                    :to="`/dash`"
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                    class="white--text" 
                    color="blue darken-3"
                    outlined
                    :disabled="!valid"
                    rounded
                    text
                    @click="saveSheet"
                    >
                        Submit Night Sheet
                    </v-btn>
                </v-form>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'new-NightSheet',
    data () {
        return {
            valid: true,
            date: new Date().toISOString().substr(0, 10),
            sheetName: null,
            day: null,
            notes: null,
            card: 0,
            cash: 0,
            total: null,
            tasks: false,
            menu: false,
            loading: false,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            cashRules: [
                v => !!v || 'Cash Recieved is required',
                v => (v/1 == v) || 'Enter a number'
            ],
            cardRules: [
                v => !!v || 'Card Recieved is required',
                v => (v/1 == v) || 'Enter a number'
            ],
            dayRules: [
                v => !!v || 'Day is required',
            ],
        }
    },
    methods: {
        saveSheet () {
            this.loading = true
            if(this.$refs.form.validate()){
                db.collection("night-sheets").add({
                Date: this.date,
                Day: this.day,
                Notes: this.notes,
                Card: this.card,
                Cash: this.cash,
                Total: parseInt(this.cash) + parseInt(this.card),
                Name: this.sheetName,
                Tasks: this.tasks
                })
                this.loading = false
                this.$router.push(`/list`)
            }
        }
    }
} 
</script>