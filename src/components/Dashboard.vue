<template>
  <v-container>
      <v-card
      class="mx-auto mb-2 mt-2 white--text"
      color="blue-grey lighten-2"
      max-width="100%"
      >
        <h2 class="white--text" style="text-align: center; font-size: 300%">{{hours}}:{{minutes}}:{{seconds}}</h2>
      </v-card>
      <v-card
        class="mx-auto"
        color="blue-grey lighten-2"
        max-width="100%"
      >
        <h2 class="white--text" style="text-align: center;">Skedda</h2>
        <iframe title="skedda" src="https://indoorfootballireland.skedda.com/booking?embedded=true" style="width: 100%; height: 500px"></iframe>
      </v-card>
      <v-spacer/>
  </v-container>

</template>

<script>
export default {
    name: 'Dashboard',
    data () {
        return {
            seconds: null,
            minutes: null,
            hours: null,
            interval: null,
        }
    },
    created() {
      this.interval = setInterval(() => this.time(), 1000)
    },
    beforeDestroy() {
      clearInterval(this.interval)
    },
    methods: {
      time() {
        let date = new Date()
        this.seconds = date.getSeconds()
        this.seconds = this.seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        this.hours = date.getHours()
        this.hours = this.hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        this.minutes = date.getMinutes()
        this.minutes = this.minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
      }
    }
}
</script>