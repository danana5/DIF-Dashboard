<template>
    <div id="view-night-sheet">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{sheet.date}}</h4></li>
            <li class="collection-item">Day: {{sheet.day}}</li>
            <li class="collection-item">Name: {{sheet.name}}</li>
            <li class="collection-item">Notes: {{sheet.notes}}</li>
        </ul>
    </div>
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