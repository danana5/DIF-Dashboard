<template>
  <v-container>
    <v-card class="mx-auto mt-10" max-width="1000">
      <v-container>
        <v-row class="mx-auto mt-3">
          <h2 class="font-weight-regular mb-2 mt-2">Parties</h2>
          <caption class="font-weight-light primary--text ml-3 mt-4">
            {{
              date
            }}
          </caption>
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
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">
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
        hide-default-footer
      >
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card>
        <v-container>
          <h1 class="font-weight-regular">Add New Party</h1>
          <v-text-field v-model="newParty.time" label="Time"></v-text-field>
          <v-text-field
            v-model="newParty.bookingName"
            label="Party Booking Name"
          ></v-text-field>
          <v-text-field
            v-model="newParty.childName"
            label="Birthday Child Name"
          ></v-text-field>
          <v-text-field
            v-model="newParty.package"
            label="Package Type"
          ></v-text-field>
          <v-text-field v-model="newParty.ref" label="Referee"></v-text-field>
          <v-text-field
            v-model="newParty.host"
            label="Party Host"
          ></v-text-field>
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
  </v-container>
</template>

<script>
  import db from './firebaseInit';
  export default {
    data() {
      return {
        headers: [
          { text: 'Time', value: 'time' },
          { text: 'Party Booking Name', value: 'bookingName' },
          { text: 'Birthday Child Name', value: 'childName' },
          { text: 'Package Type', value: 'package' },
          { text: 'Referee', value: 'ref' },
          { text: 'Party Host', value: 'host' },
        ],
        date: new Date().toISOString().substr(0, 10),
        parties: [],
        loading: false,
        menu: false,
        dialog: false,
        newParty: {
          bookingName: '',
          ref: '',
          host: '',
          time: '',
          childName: '',
          package: '',
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
          date: this.date,
        });
        this.loading = false;
        this.newParty = {
          bookingName: '',
          ref: '',
          host: '',
          time: '',
          childName: '',
          package: '',
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
                host: doc.data().host,
              };
              this.parties.push(data);
            });
          });
        this.loading = false;
      },
    },
    created() {
      this.getParties();
    },
  };
</script>
