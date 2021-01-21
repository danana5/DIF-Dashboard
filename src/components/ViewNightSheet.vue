<template>
    <v-container>
        <v-card
        class="mx-auto mt-10"
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
                <br>
                <strong>Notes:</strong> {{sheet.notes}}
            </v-card-text>
            <v-card-actions>
                <v-btn
                outlined
                rounded
                text
                class="white--text" 
                color="blue darken-3"
                :to="`edit/${sheet.id}`"
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
        <v-dialog
        v-model="dialog"
        max-width="290"
        >
            <v-card>
                <v-card-title class="headline">
                Delete this Sheet?
                </v-card-title>

                <v-card-text>
                If you delete this sheet it will be no longer accessible from the database are you sure you would like to delete it?
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="blue darken-3"
                    text
                    @click="dialog = false"
                >
                    Cancel
                </v-btn>

                <v-btn
                    color="red darken-3"
                    text
                    @click="deleteSheet"
                    :to="`/list`"
                >
                    Delete
                </v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
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
            },
            dialog:false
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
    },
    methods:{
        deleteSheet () {
            if(confirm("Are you sure you want to delte this sheet?")){
                const sheetID = this.$route.params.sheet_id

                db.collection('night-sheets').doc(sheetID).get().then(doc => {                         
                    // doc.ref.delete()
                    console.log(doc.data())
                })
            }
        }
    }
} 
</script>