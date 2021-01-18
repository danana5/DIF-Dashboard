<template>
    <v-container>
        <v-card
        class="mx-auto"
        max-width="1000"
        tile
        >
            <v-card-title>
                {{sheet.date}}
            </v-card-title>
            <v-card-subtitle>
                {{sheet.day}}
            </v-card-subtitle>
            <v-card-text>
                <strong>Name:</strong> {{sheet.name}}
            </v-card-text>
            <v-card-text>
                <strong>Notes:</strong> {{sheet.notes}}
            </v-card-text>
            <v-card-actions>
                <v-btn
                outlined
                rounded
                text
                :to="`edit/${sheet.id}`"
                >
                    <v-icon left>
                        mdi-pencil
                    </v-icon>
                    Edit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
import db from './firebaseInit'

export default {
    name: 'view-night-sheet',
    data () {
        return {
            sheet: {
                name: '',
                date: '',
                day: '',
                notes: ''
            }
        }
    },
    created () {
        const sheetID = this.$route.params.sheet_id

        db.collection('night-sheets').doc(sheetID).get().then(doc => {                         
                this.sheet.name = doc.data().Name
                this.sheet.date = doc.data().Date
                this.sheet.day = doc.data().Day
                this.sheet.notes = doc.data().Notes
        })
    }
} 
</script>