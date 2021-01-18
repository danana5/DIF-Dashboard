<template>
    <v-container>
        <v-card
        class="mx-auto"
        max-width="800"
        tile
        >
            <v-list>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title><strong>Night Sheets</strong></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-for="sheet in nightSheets" :key= "sheet.id">
                    <v-list-item-content>
                        <v-list-item-title>{{sheet.date}}</v-list-item-title>
                        <v-list-item-subtitle>{{sheet.day}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-btn elevation="1" :to="`${sheet.id}`">View</v-btn>
                </v-list-item>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
import db from './firebaseInit'
export default {
    name: 'list-of-NightSheets',
    data () {
        return {
            nightSheets: []
        }
    },
    created () {
        db.collection('night-sheets').get().then(querySnapshot => {
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
    }
} 
</script>