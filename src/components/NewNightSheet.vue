<template>
    <v-container>
        <v-card
        class="mx-auto mt-10"
        max-width="1000"
        tile
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
                    v-model="date"
                    :rules="dateRules"
                    label="Date"
                    placeholder="DD/MM/YYYY"
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
                    <v-divider inset></v-divider>
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
                    :to="`/`"
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
            date: null,
            sheetName: null,
            day: null,
            notes: null,
            card: null,
            cash: null,
            total: null,
            tasks: false,
            nameRules: [
                v => !!v || 'Name is required',
            ],
            dateRules: [
                v => !!v || 'Date is required',
                v => (v && v.length <= 10) || 'Date must be entered in the form DD/MM/YYYY'
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
            if(this.$refs.form.validate()){
                db.collection("night-sheets").add({
                Date: this.date,
                Day: this.day,
                Notes: this.notes,
                Card: this.card,
                Total: this.total,
                Name: this.sheetName,
                Tasks: this.tasks
                }).then(doc => {
                    this.$router.push(`/list`)
                    console.log(doc.data())
                })
            }
        }
    }
} 
</script>