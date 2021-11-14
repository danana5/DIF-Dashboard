<template>
  <v-container>
    <v-card
      class="mx-auto mb-2 mt-2 white--text"
      color="blue-grey lighten-2"
      max-width="100%"
    >
      <h2 class="white--text" style="text-align: center; font-size: 300%">
        {{ hours }}:{{ minutes }}:{{ seconds }}
      </h2>
    </v-card>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto"
          color="blue-grey lighten-2"
          height="100%"
          max-width="100%"
        >
          <h2 class="white--text" style="text-align: center;">Skedda</h2>
          <iframe
            title="skedda"
            src="https://indoorfootballireland.skedda.com/booking?embedded=true"
            style="width: 100%; height: 37em"
          ></iframe>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          class="mx-auto"
          color="blue-grey lighten-2"
          height="100%"
          max-width="100%"
        >
          <h2 class="white--text" style="text-align: center;">Parties</h2>
          <v-data-table
            height="37em"
            :headers="headers"
            :loading="loading"
            :items="parties"
            no-data-text="No Parties for That Date"
            sort-by="time"
            hide-default-footer
          >
          </v-data-table> </v-card
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
  import db from './firebaseInit';
  export default {
    name: 'Dashboard',
    data() {
      return {
        seconds: null,
        minutes: null,
        hours: null,
        interval: null,
        parties: [],
        loading: false,
        date: new Date().toISOString().substring(0, 10),
        headers: [
          { text: 'Time', value: 'time' },
          { text: 'Party Booking Name', value: 'bookingName' },
          { text: 'Birthday Child Name', value: 'childName' },
          { text: 'Package Type', value: 'package' },
          { text: 'Referee', value: 'ref' },
          { text: 'Party Host', value: 'host' },
        ],
      };
    },
    created() {
      this.interval = setInterval(() => this.time(), 1000);
      this.getParties();
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    methods: {
      time() {
        let date = new Date();
        this.seconds = date.getSeconds();
        this.seconds = this.seconds.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
        this.hours = date.getHours();
        this.hours = this.hours.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
        this.minutes = date.getMinutes();
        this.minutes = this.minutes.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
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
  };
</script>
