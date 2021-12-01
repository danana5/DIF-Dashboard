<template>
  <v-container>
    <v-card class="mx-auto mt-10" max-width="90em">
      <v-container>
        <v-row class="mx-auto mt-3">
          <h2 class="font-weight-regular mb-2 mt-2">Party Management</h2>
          <caption class="font-weight-light primary--text ml-3 mt-4">
            {{
              getDay(new Date(date).getDay())
            }}
            {{
              niceDate(date)
            }}
          </caption>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Choose a date"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable no-title>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="
                  $refs.menu.save(date);
                  getParties();
                "
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-btn
            class="mt-3 ml-2"
            text
            rounded
            outlined
            color="primary"
            @click="dialog = true"
            >Add Party</v-btn
          >
        </v-row>
      </v-container>
      <v-data-table
        height="37em"
        :headers="headers"
        :loading="loading"
        :items="parties"
        no-data-text="No Parties for That Date"
        sort-by="time"
        hide-default-footer
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="deleteParty(item)" dense>
            <v-icon color="error"> mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="editParty(item)" dense>
            <v-icon color="yellow"> mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card>
        <v-container>
          <h1 class="font-weight-regular">Add New Party</h1>
          <v-text-field v-model="newParty.time" label="Time"></v-text-field>
          <v-text-field
            v-model="newParty.bookingName"
            label="Party Reference"
          ></v-text-field>
          <v-text-field
            v-model="newParty.childName"
            label="Birthday Child Name"
          ></v-text-field>
          <v-text-field v-model="newParty.ref" label="Referee"></v-text-field>
          <v-text-field
            v-model="newParty.host"
            label="Party Host"
          ></v-text-field>
          <v-text-field
            v-model="newParty.food"
            label="Food Ordered"
          ></v-text-field>
          <v-text-field
            v-model="newParty.allergy"
            label="Allergy/Requests"
          ></v-text-field>
          <v-text-field
            v-model="newParty.cost"
            label="Final Cost"
          ></v-text-field>
          <v-text-field v-model="newParty.price" label="Payment"></v-text-field>
          <v-text-field
            v-model="newParty.waiver"
            label="Waivers"
          ></v-text-field>
          <v-text-field v-model="newParty.notes" label="Notes"></v-text-field>
          <v-row class="mx-auto mb-2 mt-2">
            <v-spacer></v-spacer>
            <v-btn
              @click="cancel()"
              text
              outlined
              rounded
              color="error"
              class="mr-1"
              >Cancel</v-btn
            >
            <v-btn @click="addParty()" text outlined rounded color="primary"
              >Add</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" max-width="600" persistent>
      <v-card>
        <v-container>
          <h1 class="font-weight-regular">Edit Party</h1>
          <v-text-field v-model="newParty.time" label="Time"></v-text-field>
          <v-text-field
            v-model="newParty.bookingName"
            label="Party Reference"
          ></v-text-field>
          <v-text-field
            v-model="newParty.childName"
            label="Birthday Child Name"
          ></v-text-field>
          <v-text-field v-model="newParty.ref" label="Referee"></v-text-field>
          <v-text-field
            v-model="newParty.host"
            label="Party Host"
          ></v-text-field>
          <v-text-field
            v-model="newParty.food"
            label="Food Ordered"
          ></v-text-field>
          <v-text-field
            v-model="newParty.allergy"
            label="Allergy/Requests"
          ></v-text-field>
          <v-text-field
            v-model="newParty.cost"
            label="Final Cost"
          ></v-text-field>
          <v-text-field v-model="newParty.price" label="Payment"></v-text-field>
          <v-text-field
            v-model="newParty.waiver"
            label="Waivers"
          ></v-text-field>
          <v-text-field v-model="newParty.notes" label="Notes"></v-text-field>
          <v-row class="mx-auto mb-2 mt-2">
            <v-spacer></v-spacer>
            <v-btn
              @click="cancel()"
              text
              outlined
              rounded
              color="error"
              class="mr-1"
              >Cancel</v-btn
            >
            <v-btn @click="updateParty()" text outlined rounded color="primary"
              >Update</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import db from './firebaseInit';
  export default {
    data() {
      return {
        headers: [
          {
            text: 'Actions',
            value: 'actions',
            width: '10em',
            sortable: false,
          },
          { text: 'Time', value: 'time' },
          { text: 'Party Reference', value: 'bookingName' },
          { text: 'Birthday Child Name', value: 'childName' },
          //{ text: 'Package Type', value: 'package' },
          { text: 'Referee', value: 'ref' },
          { text: 'Party Host', value: 'host' },
          { text: 'Food Ordered', value: 'food' },
          { text: 'Allergy/Requests', value: 'allergy' },
          { text: 'Final Cost', value: 'cost' },
          { text: 'Payment', value: 'price' },
          { text: 'Waivers', value: 'waiver' },
          { text: 'Notes', value: 'notes' },
        ],
        date: new Date().toISOString().substr(0, 10),
        parties: [],
        loading: false,
        menu: false,
        editDialog: false,
        dialog: false,
        newParty: {
          bookingName: '',
          ref: '',
          host: '',
          time: '',
          childName: '',
          package: '',
          notes: '',
          price: '',
          allergy: '',
          cost: '',
          waiver: '',
          food: '',
        },
      };
    },
    methods: {
      addParty() {
        this.dialog = false;
        db.collection('party-sheets').add({
          ref: this.newParty.ref,
          time: this.newParty.time,
          host: this.newParty.host,
          childName: this.newParty.childName,
          bookingName: this.newParty.bookingName,
          package: this.newParty.package,
          notes: this.newParty.notes,
          allergy: this.newParty.allergy,
          date: this.date,
          food: this.newParty.food,
          waiver: this.newParty.waiver,
          cost: this.newParty.cost,
          price: this.newParty.price,
        });
        this.loading = false;
        this.newParty = {
          bookingName: '',
          ref: '',
          host: '',
          time: '',
          childName: '',
          package: '',
          notes: '',
          price: '',
          allergy: '',
          cost: '',
          waiver: '',
          food: '',
          date: this.date,
        };
        this.getParties();
      },
      cancel() {
        this.dialog = false;
        this.newParty = {
          bookingName: '',
          ref: '',
          host: '',
          time: '',
          childName: '',
          package: '',
          notes: '',
          price: '',
          cost: '',
          waiver: '',
          food: '',
          date: this.date,
        };
      },
      getParties() {
        this.loading = true;
        this.parties = [];
        db.collection('party-sheets')
          .where('date', '==', this.date)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = {
                id: doc.id,
                time: doc.data().time,
                bookingName: doc.data().bookingName,
                childName: doc.data().childName,
                package: doc.data().package,
                ref: doc.data().ref,
                notes: doc.data().notes,
                host: doc.data().host,
                food: doc.data().food,
                allergy: doc.data().allergy,
                cost: doc.data().cost,
                price: doc.data().price,
                waiver: doc.data().waiver,
              };
              this.parties.push(data);
            });
          });
        this.loading = false;
      },
      deleteParty(party) {
        db.collection('party-sheets')
          .doc(party.id)
          .delete();
        this.getParties();
      },
      editParty(party) {
        this.newParty = {
          bookingName: party.bookingName,
          ref: party.ref,
          host: party.host,
          time: party.time,
          childName: party.childName,
          package: party.package,
          notes: party.notes,
          price: party.price || '',
          cost: party.cost || '',
          food: party.food || '',
          waiver: party.waiver || '',
          allergy: party.allergy || '',
          id: party.id,
        };

        this.editDialog = true;
      },
      updateParty() {
        this.loading = true;
        db.collection('party-sheets')
          .doc(this.newParty.id)
          .update({
            bookingName: this.newParty.bookingName,
            ref: this.newParty.ref,
            host: this.newParty.host,
            time: this.newParty.time,
            childName: this.newParty.childName,
            package: this.newParty.package,
            notes: this.newParty.notes,
            price: this.newParty.price,
            cost: this.newParty.cost,
            allergy: this.newParty.allergy,
            waiver: this.newParty.waiver,
            food: this.newParty.food,
          });
        this.loading = false;
        this.getParties();
        this.editDialog = false;
      },
      getDay(day) {
        switch (day) {
          case 1:
            return 'Monday';
          case 2:
            return 'Tuesday';
          case 3:
            return 'Wednesday';
          case 4:
            return 'Thursday';
          case 5:
            return 'Friday';
          case 6:
            return 'Saturday';
          case 0:
            return 'Sunday';
        }
      },
      niceDate(date) {
        var dateArray = date.split('-');
        return dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];
      },
    },
    created() {
      this.getParties();
    },
  };
</script>
