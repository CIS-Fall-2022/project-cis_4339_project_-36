<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome to the Dashboard!</h1>
    </div>
    <hr class="mt-10 mb-10" />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold text-red-700">List of Events and Number of Attendees (Clients) in the Last 2 Months</h2>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-center">Event Name</th>
              <th class="p-4 text-center">Number of Attendees (Clients)</th>
            </tr>
          </thead>
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

export default {
  data() {
    return {
      eventsData: []
    }
  },
  created() {
    let apiURL = 'http://localhost:3000/eventData/event-data';
    axios.get(apiURL).then(res => {
      this.eventsData = res.data;
    }).catch(error => {
      console.log(error)
    });
  },
  methods: {
    // function to count the number of attendees in the attendees array from an event
    countAttendees: function(eventAttendees) {
      // return the length of array with attendees of an event
      return eventAttendees.length;
    }
  },
};
</script>
