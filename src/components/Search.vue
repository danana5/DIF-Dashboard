<template>
    <v-container>
        <div class="searchBar">
                <v-row>
                    <v-layout align-content-center style="max-width: 30%; margin: 0 auto; min-width: 300px">
                        <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="query"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                        >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                        class="mt-10"
                        v-model="query"
                        label="Choose a date"
                        append-outer-icon="mdi-magnify"
                        readonly
                        @click:append-outer="submit"
                        @keyup.enter="submit"
                        v-bind="attrs"
                        v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="query"
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
                            @click="$refs.menu.save(query); submit()"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                    </v-layout>
                </v-row>
        </div>
        <v-card
        class="mx-auto mt-10"
        max-width="1000"
        tile
        v-if="found"
        >
            <v-card-title>
                {{resultSheet.date}}
            </v-card-title>
            <v-card-subtitle>
                {{resultSheet.day}}
            </v-card-subtitle>
            <v-card-text>
                <strong>Name:</strong> {{resultSheet.name}}
                <br>
                <strong>Notes:</strong> {{resultSheet.notes}}
                <br><br>
                <v-spacer></v-spacer>
                <strong>Cash Recieved:</strong> €{{resultSheet.cash}}
                <br>
                <strong>Card Recieved:</strong> €{{resultSheet.card}}
                <br>
                <strong>Total Recieved:</strong> €{{resultSheet.total}}

            </v-card-text>
            <v-card-actions>
                <v-btn
                outlined
                rounded
                text
                class="white--text" 
                color="blue darken-3"
                :to="`edit/${resultSheet.id}`"
                >
                    <v-icon left>
                        mdi-pencil
                    </v-icon>
                    Edit
                </v-btn>
                <v-btn
                outlined
                rounded
                text
                class="white--text" 
                color="red darken-3"
                @click.stop="dialog = true"
                >
                    <v-icon left>
                        mdi-file-remove-outline
                    </v-icon>
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>
        <h2 v-if="failed" style="text-align: center">No Sheet Exists on the date: {{searchedQuery}}</h2>
    </v-container>
</template>
<script>
import db from './firebaseInit'
export default {
    name: 'search',
    data () {
        return {
            query : null,
            nightSheets : new Map(),
            resultSheet : null,
            found : false,
            menu : false,
            failed : false,
            searchedQuery: null
        }
    },
    created () {
        db.collection('night-sheets').orderBy("Date").limit(7).get().then(querySnapshot => {
            querySnapshot.forEach(doc =>{            
                const data = {
                    'id': doc.id,
                    'name' : doc.data().Name,
                    'date' : doc.data().Date,
                    'day' : doc.data().Day,
                    'notes' : doc.data().Notes,
                    'cash' : doc.data().Cash,
                    'card' : doc.data().Card,
                    'total' : doc.data().Total
                }   
                this.nightSheets.set(doc.data().Date, data)
            })
        })
    },
    methods:{
        submit(){
            console.log(this.nightSheets)
            this.found=false
            this.searchedQuery= this.query
            this.failed=false
            this.resultSheet = null
            if(this.nightSheets.has(this.searchedQuery)){
                this.found = true
                this.resultSheet = this.nightSheets.get(this.searchedQuery)
            }
            else{
                this.failed = true
            }
        }
    }
} 
</script>

