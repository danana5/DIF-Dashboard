<template>
    <v-container>
        <div class="searchBar">
                <v-row>
                    <v-col>
                    </v-col>
                    <v-col>
                        <v-text-field
                        class="mt-10"
                        outlined
                        v-model="query"
                        :counter="10"
                        clearable
                        @click:append="submit"
                        @keyup.enter="submit"
                        label="Search By Date"
                        placeholder="DD/MM/YYYY"
                        append-icon="mdi-magnify"
                        width="200"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                    </v-col>
                </v-row>
        </div>
        <v-card
        class="mx-auto"
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
            </v-card-text>
            <v-card-text>
                <strong>Notes:</strong> {{resultSheet.notes}}
            </v-card-text>
            <v-card-actions>
                <v-btn
                outlined
                rounded
                text
                :to="`edit/${resultSheet.id}`"
                >
                    <v-icon left>
                        mdi-pencil
                    </v-icon>
                    Edit
                </v-btn>
            </v-card-actions>
        </v-card>
        <h2 v-if="failed" style="text-align: center">No Sheet Exists on the date: {{query}}</h2>
    </v-container>
</template>
<script>
import db from './firebaseInit'
export default {
    name: 'search',
    data () {
        return {
            query : null,
            nightSheets : [],
            resultSheet : null,
            found : false,
            failed : false
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
                    'notes' : doc.data().Notes
                }
                this.nightSheets.push(data)
            })
        })
    },
    methods:{
        submit(){
            this.found=false
            this.failed=false
            this.resultSheet = null
            for(let i = 0; i < this.nightSheets.length; i++){
                if(this.nightSheets[i].date == this.query){
                    this.resultSheet = this.nightSheets[i]
                }
            }
            if(this.resultSheet != null){
                this.found = true
            }
            else{
                this.failed = true
            }
        }
    }
} 
</script>
<style>
.searchBar{
    align-content: center;
    display: flex;
}
</style>
