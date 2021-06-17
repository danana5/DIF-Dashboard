<template>
	<v-container>
		<v-card class="mx-auto mt-10" max-width="1000" tile :loading="loading">
			<v-card-title>
				{{ date }}
			</v-card-title>
			<v-card-subtitle>
				{{ day }}
			</v-card-subtitle>
			<v-container>
				<v-form ref="form" v-model="valid" lazy-validation>
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
						v-model="hours"
						:rules="hourRules"
						label="Hours Worked"
						placeholder="Hours Worked"
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
					<v-textarea
						v-model="report"
						label="Incident/Report"
						auto-grow
						placeholder="Incident/Report"
						clearable
					>
					</v-textarea>
					<v-divider></v-divider>
					<v-spacer></v-spacer>
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
					<v-btn
						class="white--text mr-4"
						color="red darken-3"
						outlined
						rounded
						text
						:to="`/list`"
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
						@click="updateSheet"
					>
						Update Sheet
					</v-btn>
				</v-form>
			</v-container>
		</v-card>
	</v-container>
</template>

<script>
import db from './firebaseInit'
export default {
	name: 'EditNightSheet',
	data() {
		return {
			valid: true,
			date: null,
			sheetName: null,
			day: null,
			notes: null,
			card: 0,
			hours: null,
			report: null,
			cash: 0,
			total: null,
			nameRules: [
				v => !!v || 'Name is required',
			],
			dateRules: [
				v => !!v || 'Date is required',
				v => (v && v.length <= 10) || 'Date must be entered in the form DD/MM/YYYY'
			],
			cashRules: [
				v => !!v || 'Cash Recieved is required',
				v => (v / 1 == v) || 'Enter a number'
			],
			cardRules: [
				v => !!v || 'Card Recieved is required',
				v => (v / 1 == v) || 'Enter a number'
			],
			dayRules: [
				v => !!v || 'Day is required',
			],
			hourRules: [(v) => !!v || "You must enter hours worked"],
			loading: false,
		}
	},
	created() {
		this.loading = true
		const sheetID = this.$route.params.sheet_id
		db.collection('night-sheets').doc(sheetID).get().then(doc => {
			this.sheetName = doc.data().Name
			this.date = doc.data().Date
			this.day = doc.data().Day
			this.notes = doc.data().Notes
			this.report = doc.data().Report
			this.hours = doc.data().Hours
			this.cash = doc.data().Cash
			this.card = doc.data().Card
			this.loading = false
		})
	},
	methods: {
		updateSheet() {
			this.loading = true
			const sheetID = this.$route.params.sheet_id
			db.collection('night-sheets').doc(sheetID).update({
				Name: this.sheetName,
				Day: this.day,
				Date: this.date,
				Cash: this.cash,
				Hours: this.hours,
				Report: this.report,
				Card: this.card,
				Total: parseInt(this.cash) + parseInt(this.card),
				Notes: this.notes
			})
			this.loading = false
			this.$router.push(`/` + sheetID)
		}
	}
}
</script>
