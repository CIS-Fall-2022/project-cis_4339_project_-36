<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome to the Dashboard!</h1>
    </div>
    <hr class="mt-10 mb-10" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="flex flex-col col-start-2 col-end-4">
        <div class="ml-10">
          <h2 class="text-2xl font-bold text-red-700">List of Events and Number of Attendees (Clients) in the Last 2 Months</h2>
        </div>
        <br>
        <!-- Bar Chart for the number of attendeees for each event -->
        <div>
          <canvas id="eventsChart" width="400" height="400" ></canvas>
        </div>
        <br>
        <!-- Table of list of events and number of attendees in the last 2 months -->
        <table class="min-w-full shadow-md rounded">
          <!-- Field names for the table -->
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-center">Event Name</th>
              <th class="p-4 text-center">Number of Attendees (Clients)</th>
            </tr>
          </thead>
          <!-- Event and number of attendees/clients data for the table -->
          <tbody class="divide-y divide-gray-300">
            <tr v-for="event in eventsData" :key="event._id">
              <td class="p-2 text-center">{{ event.eventName }}</td>
              <td class="p-2 text-center">{{ countAttendees(event.attendees) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>


<script>
import axios from "axios";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  data() {
    return {
      eventsData: [],
      labels: [],
      numAttendees: []
    }
  },
  created() {
    // getting eventsData
    let apiURL = `http://localhost:3000/eventData/event-data`;
    axios.get(apiURL).then(res => {
      this.eventsData = res.data;
    }).catch(error => {
      console.log(error)
    });
  },
  mounted() {
    // use the function to fetch data
    this.fetchData();

    const ctx = document.getElementById('eventsChart');

    // create a new chart (bar chart)
    const eventsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Number of Attendees (Clients)',
          data: this.numAttendees,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // call the eventsChart
    eventsChart;
  },
  methods: {
    // function to count the number of attendees in the attendees array from an event
    countAttendees: function(eventAttendees) {
      // return the length of array with attendees of an event
      return eventAttendees.length;
    },
    // function to fetch data for the labels and the number of attendees
    async fetchData() {
      const url = `http://localhost:3000/eventData/event-data`;
      const response = await axios.get(url);
      this.labels = response.data.map((event) => event.eventName);
      this.numAttendees = response.data.map((event) => event.attendees.length);
    }
  }
};
</script>
